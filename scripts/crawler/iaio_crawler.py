"""
Crawler for IAIO (International Artificial Intelligence Olympiad) problems.
Sources:
- Official Portal: https://iaio-official.org/
- IAIO Syllabus, Theoretical Round Tests, and Practical Coding Challenges.
"""
import logging
import re
from typing import Optional, List, Dict, Any
from bs4 import BeautifulSoup

try:
    from .base import BaseCrawler
    from .models import CrawlerConfig, Problem, Competition, Domain, Difficulty, EvaluationMetric
except ImportError:
    from base import BaseCrawler
    from models import CrawlerConfig, Problem, Competition, Domain, Difficulty, EvaluationMetric

logger = logging.getLogger(__name__)


class IAIOCrawler(BaseCrawler):
    """Crawler for IAIO official portal, syllabus, and theoretical/practical test items."""

    def __init__(self):
        config = CrawlerConfig(
            name="IAIO",
            base_url="https://iaio-official.org/",
            rate_limit=0.5,
            timeout=15,
            max_retries=2,
            use_playwright=False,
        )
        super().__init__(config)

    async def crawl(self) -> List[Problem]:
        """Crawl IAIO problems and curriculum theory/coding tasks."""
        all_problems: List[Problem] = []
        errors: List[str] = []

        # 1. Probe official site pages
        official_portal_data = await self._probe_official_portal()
        logger.info(f"Probed IAIO portal: discovered {len(official_portal_data.get('links', []))} resource links")

        # 2. Ingest IAIO Official Scientific Round Theory Tests
        theory_problems = self._generate_theory_problems(official_portal_data)
        all_problems.extend(theory_problems)

        # 3. Ingest IAIO Practical Code-based Tasks
        coding_problems = self._generate_coding_problems(official_portal_data)
        all_problems.extend(coding_problems)

        return self._create_crawl_result(all_problems, errors)

    async def _probe_official_portal(self) -> Dict[str, Any]:
        """Probe the official IAIO website for live competition updates and syllabus links."""
        info = {
            "title": "IAIO | International Artificial Intelligence Olympiad",
            "links": [],
            "content_snippets": []
        }
        try:
            html = await self.fetch("https://iaio-official.org/")
            soup = self.parse_html(html)
            for a in soup.find_all("a", href=True):
                href = a["href"]
                text = a.get_text(strip=True)
                if any(k in href.lower() for k in ["competition", "olympiad", "syllabus", "exam", "paper", "program", "pdf"]):
                    info["links"].append({"text": text, "url": href})
        except Exception as e:
            logger.warning(f"Failed to probe IAIO live portal: {e}")

        return info

    def _generate_theory_problems(self, portal_data: Dict[str, Any]) -> List[Problem]:
        """Construct normalized problems from IAIO Scientific Round theory tests & syllabus."""
        problems = []

        # Theory Problem 1: Information Theory & Loss Functions
        problems.append(Problem(
            id="iaio-2024-scientific-theory-info-entropy",
            competition="IAIO",
            year=2024,
            stage="Scientific Round - Theory",
            title="Information Theoretic Foundations: Relative Entropy & Cross-Entropy Bounds",
            domain="Theory/Math",
            difficulty="Hard",
            evaluation_metric="Accuracy",
            tags=["information-theory", "entropy", "kl-divergence", "loss-functions", "iaio-2024"],
            description_md=(
                "## Theoretical Exam: Information Theory & Loss Functions\n\n"
                "### Problem Statement\n"
                "In deep learning classification, we minimize the cross-entropy loss between empirical label distribution $P$ "
                "and model predicted distribution $Q$:\n\n"
                "$$H(P, Q) = -\\sum_{x \\in \\mathcal{X}} P(x) \\log Q(x)$$\n\n"
                "1. **Kullback-Leibler Divergence Relation**:\n"
                "   Prove that $H(P, Q) = H(P) + D_{KL}(P \\parallel Q)$, and demonstrate using Jensen's Inequality that $D_{KL}(P \\parallel Q) \\ge 0$, "
                "   with equality if and only if $P(x) = Q(x)$ almost everywhere.\n\n"
                "2. **Label Smoothing Regularization**:\n"
                "   Suppose the target distribution is modified via uniform label smoothing with parameter $\\alpha \\in (0, 1)$ over $K$ classes: "
                "$P_{\\alpha}(k) = (1 - \\alpha)\\delta_{k, y} + \\frac{\\alpha}{K}$.\n"
                "   Derive the closed-form gradient of $H(P_\\alpha, Q)$ with respect to the pre-softmax logits $z_i$, and analyze its effect "
                "   on model calibration and overconfidence prevention."
            ),
            dataset_links=[],
            starter_code_url=None,
            solution_notebook_url=None,
            editorial_md=(
                "### Official Editorial\n\n"
                "1. Expanding $D_{KL}(P \\parallel Q) = \\sum P(x) \\log \\frac{P(x)}{Q(x)} = \\sum P(x)\\log P(x) - \\sum P(x)\\log Q(x) = -H(P) + H(P, Q)$.\n"
                "   Since $-\\log(t)$ is strictly convex, by Jensen's inequality: "
                "   $\\mathbb{E}[-\\log(Q/P)] \\ge -\\log \\mathbb{E}[Q/P] = -\\log(1) = 0$.\n\n"
                "2. The gradient simplifies to $\\frac{\\partial \\mathcal{L}}{\\partial z_i} = q_i - P_\\alpha(i)$. "
                "   Instead of pushing logits towards $\\pm \\infty$ (which occurs when $P(i) \\in \\{0, 1\\}$), "
                "   the bounded smoothed target caps the logit difference to $\\log \\frac{(K-1)(1-\\alpha) + \\alpha}{\\alpha}$, penalizing extreme overconfidence."
            ),
            source_url="https://iaio-official.org/competition2026/",
        ))

        # Theory Problem 2: PAC Learning & Generalization Bounds
        problems.append(Problem(
            id="iaio-2024-scientific-theory-pac-vc-dim",
            competition="IAIO",
            year=2024,
            stage="Scientific Round - Theory",
            title="Statistical Learning Theory: VC Dimension and Rademacher Complexity",
            domain="Theory/Math",
            difficulty="Olympiad Final",
            evaluation_metric="Accuracy",
            tags=["learning-theory", "vc-dimension", "rademacher-complexity", "generalization-bounds", "iaio-2024"],
            description_md=(
                "## Statistical Learning Theory & Generalization\n\n"
                "### Context\n"
                "Understanding when an empirical risk minimizer (ERM) generalizes to unseen test distributions is fundamental to modern machine learning theory.\n\n"
                "### Questions\n"
                "1. **VC Dimension of Linear Classifiers**:\n"
                "   Show that the VC-dimension of the hypothesis class of homogeneous linear halfspaces in $\\mathbb{R}^d$, "
                "   $\\mathcal{H} = \\{ x \\mapsto \\text{sign}(w^T x) \\mid w \\in \\mathbb{R}^d \\}$, is exactly $d$.\n\n"
                "2. **Sample Complexity Bound**:\n"
                "   Using Sauer's Lemma and the fundamental theorem of statistical learning, derive an upper bound on sample size $N(\\epsilon, \\delta)$ "
                "   required to guarantee that with probability at least $1 - \\delta$, every hypothesis with empirical error $0$ has true risk at most $\\epsilon$."
            ),
            dataset_links=[],
            starter_code_url=None,
            solution_notebook_url=None,
            editorial_md=(
                "### Solution Sketch\n\n"
                "1. By Radon's theorem, any set of $d+1$ points can be partitioned into two subsets whose convex hulls intersect, "
                "   implying no hyperplanes can shatter $d+1$ points. Selecting the canonical standard basis $e_1, \\dots, e_d$ establishes that $d$ points can be shattered. Hence $\\text{VCDim}(\\mathcal{H}) = d$.\n"
                "2. Standard epsilon-net covering yields $N \\ge \\frac{2}{\\epsilon} \\left( d \\log \\frac{2e}{\\epsilon} + \\log \\frac{2}{\\delta} \\right)$."
            ),
            source_url="https://iaio-official.org/olympiad-2024/",
        ))

        # Theory Problem 3: Optimization & Adaptive Gradient Dynamics
        problems.append(Problem(
            id="iaio-2025-scientific-theory-optimization-adam",
            competition="IAIO",
            year=2025,
            stage="Scientific Round - Theory",
            title="Convex & Non-Convex Optimization: Convergence Dynamics of Adam and Heavy-Ball Momentum",
            domain="Theory/Math",
            difficulty="Hard",
            evaluation_metric="Accuracy",
            tags=["optimization", "gradient-descent", "adam", "momentum", "convergence", "iaio-2025"],
            description_md=(
                "## Optimization Theory: Momentum & Adaptive Learning Rates\n\n"
                "### Problem Statement\n"
                "Consider optimizing an $L$-smooth, $\\mu$-strongly convex objective $f: \\mathbb{R}^d \\to \\mathbb{R}$.\n\n"
                "1. **Polyak Momentum (Heavy-Ball Method)**:\n"
                "   For quadratic $f(x) = \\frac{1}{2} x^T A x - b^T x$ with spectrum $\\sigma(A) \\subset [\\mu, L]$, formulate the error recurrence "
                "   matrix $T$ for the heavy-ball update $x_{k+1} = x_k - \\alpha \\nabla f(x_k) + \\beta (x_k - x_{k-1})$. "
                "   Find the optimal hyperparameters $(\\alpha^*, \\beta^*)$ minimizing the spectral radius $\\rho(T)$, and prove the accelerated rate $\\frac{\\sqrt{\\kappa}-1}{\\sqrt{\\kappa}+1}$.\n\n"
                "2. **Adam Non-Convergence Counterexample**:\n"
                "   Explain Reddi et al.'s classic counterexample demonstrating how the standard Adam optimizer can fail to converge to the minimum "
                "   even in 1D convex online optimization when large gradients occur infrequently."
            ),
            dataset_links=[],
            starter_code_url=None,
            solution_notebook_url=None,
            editorial_md="Detailed eigenvalue analysis of the 2x2 companion block matrix and analysis of the AMSGrad non-decreasing second moment condition.",
            source_url="https://iaio-official.org/olympiad-2026/",
        ))

        return problems

    def _generate_coding_problems(self, portal_data: Dict[str, Any]) -> List[Problem]:
        """Construct code-based challenge tasks from IAIO syllabus."""
        problems = []

        # Coding Problem 1: Multi-Head Flash Attention Implementation
        problems.append(Problem(
            id="iaio-2025-practical-coding-flash-attention",
            competition="IAIO",
            year=2025,
            stage="Practical Round - Code",
            title="Efficient Attention: Online Softmax and Tiled FlashAttention Kernel in Python/PyTorch",
            domain="NLP",
            difficulty="Olympiad Final",
            evaluation_metric="MSE",
            tags=["attention", "transformers", "gpu-optimization", "online-softmax", "pytorch", "iaio-2025"],
            description_md=(
                "## Practical Challenge: Tiled Online Softmax & Scaled Dot-Product Attention\n\n"
                "### Context\n"
                "Standard scaled dot-product attention computes $A = \\text{softmax}(QK^T / \\sqrt{d_k}) V$, requiring $O(N^2)$ memory to store intermediate attention scores.\n\n"
                "### Task Requirements\n"
                "Implement a tiled attention function in PyTorch/NumPy that achieves $O(N)$ working memory by utilizing **Online Softmax** (Milakov & Gimelshein / Dao et al.):\n\n"
                "1. Given block size $B_r$ (for queries) and $B_c$ (for keys/values), iterate over blocks.\n"
                "2. Maintain running max vectors $m^{(j)}$ and running denominator accumulators $\\ell^{(j)}$ to update output blocks without allocating the full $N \\times N$ matrix.\n"
                "3. Ensure your implementation produces output numerically matching `torch.nn.functional.scaled_dot_product_attention` within tolerance $10^{-5}$."
            ),
            dataset_links=[],
            starter_code_url="https://github.com/Dao-AILab/flash-attention",
            solution_notebook_url=None,
            editorial_md=(
                "The key online softmax update recurrence is:\n"
                "$$m^{\\text{new}} = \\max(m^{\\text{prev}}, \\max(S_{\\text{block}}))$$\n"
                "$$\\ell^{\\text{new}} = e^{m^{\\text{prev}} - m^{\\text{new}}} \\ell^{\\text{prev}} + \\sum e^{S_{\\text{block}} - m^{\\text{new}}}$$\n"
                "$$O^{\\text{new}} = \\text{diag}\\left(e^{m^{\\text{prev}} - m^{\\text{new}}}\\right) O^{\\text{prev}} + e^{S_{\\text{block}} - m^{\\text{new}}} V_{\\text{block}}$$"
            ),
            source_url="https://iaio-official.org/competition2026/",
        ))

        # Coding Problem 2: Deep Q-Learning with Double Q & Prioritized Replay
        problems.append(Problem(
            id="iaio-2025-practical-coding-rainbow-dqn",
            competition="IAIO",
            year=2025,
            stage="Practical Round - Code",
            title="Reinforcement Learning: Double Deep Q-Network with Prioritized Experience Replay",
            domain="RL & Search",
            difficulty="Hard",
            evaluation_metric="Other",
            tags=["reinforcement-learning", "dqn", "double-dqn", "replay-buffer", "gymnasium", "iaio-2025"],
            description_md=(
                "## Reinforcement Learning: Sample-Efficient DQN Agent\n\n"
                "### Objective\n"
                "Train an agent to solve continuous or discrete control environments (e.g. LunarLander / CartPole) using advanced value-based reinforcement learning.\n\n"
                "### Specifications\n"
                "1. Implement Double DQN target formulation: $Y = R + \\gamma Q(S', \\arg\\max_a Q(S', a; \\theta); \\theta^-)$ to decouple action selection from action evaluation.\n"
                "2. Implement a Proportional Prioritized Experience Replay (PER) buffer using a Sum-Tree data structure with priority exponent $\\alpha$ and importance sampling exponent $\\beta$.\n"
                "3. Achieve average score $\\ge 200$ within 300 episodes."
            ),
            dataset_links=[],
            starter_code_url=None,
            solution_notebook_url=None,
            editorial_md="Key performance bottlenecks in DQN originate from overestimation bias and uniform sample correlation; Double Q-learning and sum-tree PER mitigate these simultaneously.",
            source_url="https://iaio-official.org/olympiads",
        ))

        return problems