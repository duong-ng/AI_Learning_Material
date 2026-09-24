#!/usr/bin/env python
"""
Main entry point for running AI Olympiad crawlers.
Usage:
    python -m scripts.crawler.run_crawlers --all          # Run all crawlers
    python -m scripts.crawler.run_crawlers --ioai         # Run only IOAI
    python -m scripts.crawler.run_crawlers --iaio         # Run only IAIO
    python -m scripts.crawler.run_crawlers --national     # Run all national/regional
    python -m scripts.crawler.run_crawlers --usnaio       # Run only US-NAAO
    python -m scripts.crawler.run_crawlers --noai         # Run only China NOAI
    python -m scripts.crawler.run_crawlers --polish       # Run only Polish OAI
    python -m scripts.crawler.run_crawlers --roai         # Run only Romanian ROAI
    python -m scripts.crawler.run_crawlers --aicc         # Run only AICC
    python -m scripts.crawler.run_crawlers --list         # List available crawlers
"""
import argparse
import asyncio
import logging
import sys
from pathlib import Path

# Add directories to path
curr_dir = Path(__file__).parent.resolve()
for p in [str(curr_dir), str(curr_dir.parent.resolve()), str(curr_dir.parent.parent.resolve())]:
    if p not in sys.path:
        sys.path.insert(0, p)

try:
    from scripts.crawler.ioai_crawler import IOAICrawler
    from scripts.crawler.iaio_crawler import IAIOCrawler
    from scripts.crawler.national_crawlers import (
        USNAAOCrawler, NOAICrawler, PolishOAICrawler, ROAICrawler, AICCCrawler,
        CRAWLERS as NATIONAL_CRAWLERS
    )
    from scripts.crawler.storage import ProblemStorage
    from scripts.crawler.models import CrawlResult
    from scripts.crawler.theory_crawler import TheoryCrawler
except ImportError:
    from ioai_crawler import IOAICrawler
    from iaio_crawler import IAIOCrawler
    from national_crawlers import (
        USNAAOCrawler, NOAICrawler, PolishOAICrawler, ROAICrawler, AICCCrawler,
        CRAWLERS as NATIONAL_CRAWLERS
    )
    from storage import ProblemStorage
    from models import CrawlResult
    from theory_crawler import TheoryCrawler

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("CrawlerRunner")

# Registry of all crawlers
CRAWLERS = {
    "ioai": ("IOAI", IOAICrawler),
    "iaio": ("IAIO", IAIOCrawler),
    "usnaio": ("US-NAAO", USNAAOCrawler),
    "noai": ("China NOAI", NOAICrawler),
    "polish": ("Polish OAI", PolishOAICrawler),
    "roai": ("Romania ROAI", ROAICrawler),
    "aicc": ("AICC Community", AICCCrawler),
    "theory": ("AI Olympiad Theory Banks (VOAI, VAIC, IOAI)", TheoryCrawler),
}


async def run_crawler(name: str, crawler_class, storage: ProblemStorage, fmt: str = "both") -> CrawlResult:
    """Run a single crawler and persist results to storage."""
    logger.info(f"Starting {name} crawler...")
    try:
        async with crawler_class() as crawler:
            result = await crawler.crawl()
            logger.info(f"{name} completed: {len(result.problems)} problems crawled, {len(result.errors)} errors")

            if result.problems:
                saved = storage.save_crawl_result(result, format=fmt)
                logger.info(f"Successfully saved {len(saved['json'])} JSON and {len(saved['markdown'])} Markdown files.")
                if saved.get("errors"):
                    logger.warning(f"Storage errors: {saved['errors']}")

            return result
    except Exception as e:
        logger.error(f"{name} crawler failed with unhandled exception: {e}", exc_info=True)
        return CrawlResult(
            success=False,
            problems=[],
            errors=[str(e)],
            source=name
        )


async def run_all(storage: ProblemStorage, selected: list[str] = None, fmt: str = "both") -> dict:
    """Run all or specified crawlers."""
    to_run = selected if selected else list(CRAWLERS.keys())
    results = {}

    for key in to_run:
        if key not in CRAWLERS:
            logger.warning(f"Unknown crawler '{key}', skipping.")
            continue

        display_name, crawler_class = CRAWLERS[key]
        result = await run_crawler(display_name, crawler_class, storage, fmt=fmt)
        results[key] = result

    return results


def print_summary(results: dict, storage: ProblemStorage):
    """Print an executive summary table of the crawl session and storage contents."""
    print("\n" + "=" * 75)
    print("           AI OLYMPIADS INGESTION PIPELINE - RUN SUMMARY")
    print("=" * 75)
    print(f"{'Status':<8} | {'Crawler / Competition':<25} | {'Problems':<10} | {'Errors':<8}")
    print("-" * 75)

    total_problems = 0
    total_errors = 0

    for key, result in results.items():
        display_name = CRAWLERS[key][0]
        status = "[OK]" if result.success and len(result.problems) > 0 else "[FAIL]"
        print(f"{status:<8} | {display_name:<25} | {len(result.problems):<10} | {len(result.errors):<8}")
        total_problems += len(result.problems)
        total_errors += len(result.errors)

    print("-" * 75)
    print(f"{'TOTAL':<8} | {'All Target Sources':<25} | {total_problems:<10} | {total_errors:<8}")
    print("=" * 75)

    # Print current dataset statistics
    stats = storage.get_stats()
    print("\n" + "=" * 75)
    print(f"       STORAGE DATABASE SUMMARY ({storage.base_dir.resolve()})")
    print("=" * 75)
    print(f"Total Problems in Archive: {stats['total']}")
    print("\nBreakdown by Competition:")
    for comp, count in sorted(stats["by_competition"].items(), key=lambda x: -x[1]):
        print(f"  - {comp:<15}: {count:3} tasks")

    print("\nBreakdown by Domain:")
    for dom, count in sorted(stats["by_domain"].items(), key=lambda x: -x[1]):
        print(f"  - {dom:<15}: {count:3} tasks")

    print("\nBreakdown by Difficulty:")
    for diff, count in sorted(stats["by_difficulty"].items(), key=lambda x: -x[1]):
        print(f"  - {diff:<15}: {count:3} tasks")

    print("\nBreakdown by Evaluation Metric:")
    for metric, count in sorted(stats["by_metric"].items(), key=lambda x: -x[1]):
        print(f"  - {metric:<15}: {count:3} tasks")
    print("=" * 75 + "\n")


def main():
    parser = argparse.ArgumentParser(description="AI Olympiad Data Crawlers & Ingestion Engine")
    parser.add_argument("--all", action="store_true", help="Run all crawlers (default)")
    parser.add_argument("--ioai", action="store_true", help="Run IOAI crawler only")
    parser.add_argument("--iaio", action="store_true", help="Run IAIO crawler only")
    parser.add_argument("--national", action="store_true", help="Run all national selection crawlers")
    parser.add_argument("--usnaio", action="store_true", help="Run US-NAAO crawler only")
    parser.add_argument("--noai", action="store_true", help="Run China NOAI crawler only")
    parser.add_argument("--polish", action="store_true", help="Run Polish OAI crawler only")
    parser.add_argument("--roai", action="store_true", help="Run Romanian ROAI crawler only")
    parser.add_argument("--aicc", action="store_true", help="Run AICC community contest crawler only")
    parser.add_argument("--theory", action="store_true", help="Run AI Olympiad Theory Banks (VOAI, VAIC, IOAI) crawler")
    parser.add_argument("--list", action="store_true", help="List available crawlers")
    parser.add_argument("--storage-dir", default="data/problems", help="Storage directory for problems")
    parser.add_argument("--format", choices=["both", "json", "markdown"], default="both", help="Output format")

    args = parser.parse_args()

    if args.list:
        print("Available AI Olympiad crawlers:")
        for key, (name, _) in CRAWLERS.items():
            print(f"  --{key:<10} : {name}")
        return

    # Select crawlers based on arguments
    selected = []
    if args.ioai:
        selected.append("ioai")
    if args.iaio:
        selected.append("iaio")
    if args.national:
        selected.extend(["usnaio", "noai", "polish", "roai", "aicc"])
    if args.usnaio and "usnaio" not in selected:
        selected.append("usnaio")
    if args.noai and "noai" not in selected:
        selected.append("noai")
    if args.polish and "polish" not in selected:
        selected.append("polish")
    if args.roai and "roai" not in selected:
        selected.append("roai")
    if args.aicc and "aicc" not in selected:
        selected.append("aicc")
    if args.theory and "theory" not in selected:
        selected.append("theory")

    # If no specific crawler requested, default to all
    if not selected:
        selected = list(CRAWLERS.keys())

    # Initialize storage layer
    storage = ProblemStorage(args.storage_dir)

    # Execute crawler async loop
    results = asyncio.run(run_all(storage, selected, fmt=args.format))

    # Print summary
    print_summary(results, storage)

    # Exit code
    if any(not r.success for r in results.values()):
        sys.exit(1)


if __name__ == "__main__":
    main()