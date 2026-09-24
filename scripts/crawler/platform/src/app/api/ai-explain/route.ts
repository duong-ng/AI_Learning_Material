import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      question,
      options = [],
      correctAnswer,
      userAnswer,
      topic = "Lý thuyết AI",
      competition = "Olympic AI",
      baseExplanation = "",
      userQuestion,
      chatHistory = [],
    } = body;

    if (!question || !correctAnswer) {
      return NextResponse.json(
        { error: "Thiếu dữ liệu câu hỏi hoặc đáp án chính xác." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Chưa cấu hình OPENROUTER_API_KEY. Vui lòng thiết lập biến môi trường này trong file .env.",
        },
        { status: 500 }
      );
    }
    const model =
      process.env.OPENROUTER_MODEL ||
      "nvidia/nemotron-3-ultra-550b-a55b:free";
    const baseUrl =
      process.env.OPENROUTER_BASE_URL ||
      "https://openrouter.ai/api/v1";

    const formattedOptions = Array.isArray(options)
      ? options.map((opt: any) => `${opt.id}. ${opt.text}`).join("\n")
      : "";

    let apiMessages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [];

    if (userQuestion && typeof userQuestion === "string" && userQuestion.trim()) {
      // User asking a specific custom question to the assistant
      const systemPrompt = `Bạn là Trợ lý AI Nemotron-3 Ultra (NVIDIA Nemotron-3-Ultra 550B), chuyên gia huấn luyện đội tuyển Olympic Trí tuệ Nhân tạo (IOAI, IAIO, VOAI, VAIC).
Bạn đang trực tiếp hỗ trợ, giải đáp sâu sắc các thắc mắc của học sinh về câu hỏi thi Olympic AI sau:
[CHUYÊN ĐỀ]: ${topic} - [NGUỒN]: ${competition}
[ĐỀ BÀI CÂU HỎI]:
${question}

[CÁC PHƯƠNG ÁN LỰA CHỌN]:
${formattedOptions}

[ĐÁP ÁN ĐÚNG]: ${correctAnswer}
${
  userAnswer
    ? `[LỰA CHỌN CỦA HỌC SINH]: ${userAnswer} (${
        userAnswer === correctAnswer ? "ĐÃ CHỌN ĐÚNG" : "CHỌN CHƯA ĐÚNG"
      })`
    : ""
}
${
  baseExplanation
    ? `\n[TÓM TẮT ĐÁP ÁN GỐC]:\n${baseExplanation}\n`
    : ""
}

QUY TẮC BẮT BUỘC:
- Mọi công thức toán học, ma trận, vector, đạo hàm, gradient, hàm mục tiêu PHẢI dùng chuẩn KaTeX ($...$ cho inline và $$...$$ cho công thức khối).
- QUY TẮC XUỐNG DÒNG ĐÁP ÁN TRẮC NGHIỆM:
  Khi tạo câu hỏi mới hoặc bài tập trắc nghiệm (như bài tập biến thể), các phương án A, B, C, D BẮT BUỘC PHẢI CÁCH DÒNG RIÊNG BIỆT thành từng dòng danh sách Markdown:
  **Các phương án lựa chọn:**
  - **A.** [Nội dung phương án A]
  - **B.** [Nội dung phương án B]
  - **C.** [Nội dung phương án C]
  - **D.** [Nội dung phương án D]
  Tuyệt đối KHÔNG ĐƯỢC viết dính liền "A. ... B. ... C. ... D. ..." trên cùng một dòng hoặc trong cùng một đoạn văn.
- QUY TẮC BẢNG SO SÁNH (MARKDOWN TABLES):
  Khi cần so sánh thông tin giữa các đặc trưng (features), phương pháp, thuật toán hoặc phân tích phương án, BẮT BUỘC sử dụng bảng Markdown chuẩn và MỖI HÀNG PHẢI NẰM TRÊN MỘT DÒNG RIÊNG BIỆT (bắt buộc có ký tự xuống dòng '\\n'):
  | Tiêu chí / Phương án | Bản chất / Sai lầm | Giải thích khoa học |
  | :--- | :--- | :--- |
  | **A** | [Nội dung] | [Giải thích] |
  | **B** | [Nội dung] | [Giải thích] |
- Trả lời trực tiếp, khúc chiết, sâu sắc vào câu hỏi của học sinh. Nếu cần hãy đưa ra ví dụ minh họa bằng số hoặc chứng minh cụ thể.
- Sử dụng tiếng Việt học thuật, chuẩn mực sư phạm, khơi gợi tư duy logic.`;

      apiMessages = [{ role: "system", content: systemPrompt }];

      // Include previous turns if any
      if (Array.isArray(chatHistory)) {
        for (const msg of chatHistory) {
          if ((msg.role === "user" || msg.role === "assistant") && msg.content) {
            apiMessages.push({ role: msg.role, content: msg.content });
          }
        }
      }

      // Add the new user question
      apiMessages.push({
        role: "user",
        content: userQuestion.trim(),
      });
    } else {
      // Standard comprehensive 4-part breakdown
      const systemPrompt = `Bạn là Trợ lý AI Nemotron-3 Ultra (NVIDIA Nemotron-3-Ultra 550B), chuyên gia huấn luyện đội tuyển Olympic Trí tuệ Nhân tạo (IOAI, IAIO, VOAI, VAIC).
Nhiệm vụ của bạn là phân tích sâu sắc, khoa học, chặt chẽ về mặt toán học và dễ tiếp thu cho học sinh.
QUY TẮC BẮT BUỘC VỀ TOÁN HỌC & ĐỊNH DẠNG:
- Mọi công thức toán, ma trận, vector, chỉ số, hàm mất mát PHẢI được bọc chuẩn KaTeX ($...$ cho inline và $$...$$ cho công thức khối).
- Viết bằng tiếng Việt học thuật, chuẩn mực, truyền cảm hứng tư duy.
- BẢNG SO SÁNH (MARKDOWN TABLE): Khi so sánh các phương án hoặc đặc trưng, BẮT BUỘC trình bày bảng Markdown chuẩn với đầy đủ dấu xuống dòng cho từng hàng.
- NẾU TẠO CÂU HỎI TRẮC NGHIỆM HOẶC BÀI TẬP BIẾN THỂ: Mỗi phương án A, B, C, D BẮT BUỘC phải xuống dòng riêng biệt dạng:
  - **A.** ...
  - **B.** ...
  - **C.** ...
  - **D.** ...

CẤU TRÚC BÀI GIẢNG GIẢI THÍCH:
1. 🎯 **Bản chất cốt lõi & Cơ sở lý thuyết**:
   Nêu rõ các định lý, công thức nền tảng (Toán học tối ưu, Đạo hàm, Xác suất thống kê, Đại số ma trận hoặc Kiến trúc mạng AI).
2. 🔬 **Chứng minh & Phân tích vì sao đáp án ${correctAnswer} đúng**:
   Các bước diễn giải logic chặt chẽ, tính toán từng bước chi tiết (nếu có bài toán số liệu).
3. ❌ **Phân tích bẫy tư duy ở các phương án còn lại (kèm Bảng so sánh)**:
   Chỉ ra chính xác vì sao các phương án khác sai hoặc gây nhầm lẫn${
     userAnswer && userAnswer !== correctAnswer
       ? ` (đặc biệt lưu ý học sinh đã chọn phương án ${userAnswer})`
       : ""
   }. Trình bày dưới dạng Bảng Markdown so sánh các phương án A, B, C, D rõ ràng từng dòng.
4. 💡 **Mẹo nhận diện nhanh trong phòng thi Olympic**:
   Kinh nghiệm hoặc nguyên lý trực giác giúp nhận diện dạng câu này trong 30 giây.`;

      const userPrompt = `[CHUYÊN ĐỀ]: ${topic} - [NGUỒN]: ${competition}

[ĐỀ BÀI CÂU HỎI]:
${question}

[CÁC PHƯƠNG ÁN LỰA CHỌN]:
${formattedOptions}

[ĐÁP ÁN ĐÚNG]: ${correctAnswer}
${
  userAnswer
    ? `[LỰA CHỌN CỦA HỌC SINH]: ${userAnswer} (${
        userAnswer === correctAnswer ? "ĐÃ CHỌN ĐÚNG" : "CHỌN CHƯA ĐÚNG"
      })`
    : ""
}
${
  baseExplanation
    ? `\n[TÓM TẮT ĐÁP ÁN GỐC TỪ BỘ ĐỀ]:\n${baseExplanation}\n`
    : ""
}

Hãy đưa ra lời giải thích chi tiết, chuyên sâu và chuẩn xác cho học sinh đội tuyển Olympic AI.`;

      apiMessages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ];
    }

    const maxTokens = process.env.OPENROUTER_MAX_TOKENS
      ? parseInt(process.env.OPENROUTER_MAX_TOKENS)
      : 4096;

    // Resilient fallback chain for free models when primary model is overloaded
    const candidateModels = Array.from(
      new Set(
        [
          model,
          "nvidia/nemotron-3-super-120b-a12b:free",
          "google/gemma-4-26b-a4b-it:free",
        ].filter(Boolean)
      )
    );

    let successfulData: any = null;
    let selectedModel = model;
    let lastErrorMessage = "";

    for (const currentModel of candidateModels) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);

        const response = await fetch(`${baseUrl}/chat/completions`, {
          method: "POST",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "AI Olympiad VN Academic Assistant",
          },
          body: JSON.stringify({
            model: currentModel,
            messages: apiMessages,
            temperature: 0.2,
            max_tokens: maxTokens,
          }),
        }).finally(() => clearTimeout(timeoutId));

        if (!response.ok) {
          const errText = await response.text();
          lastErrorMessage = `HTTP ${response.status}: ${errText}`;
          console.warn(`Model ${currentModel} returned HTTP error: ${lastErrorMessage}. Trying next candidate...`);
          continue;
        }

        const data = await response.json();
        if (data.error) {
          lastErrorMessage = data.error.message || JSON.stringify(data.error);
          console.warn(`Model ${currentModel} returned JSON error: ${lastErrorMessage}. Trying next candidate...`);
          continue;
        }

        const choice = data.choices?.[0];
        const content = choice?.message?.content || choice?.message?.reasoning || "";
        if (content && content.trim()) {
          successfulData = data;
          selectedModel = currentModel;
          break;
        }
      } catch (err: any) {
        lastErrorMessage = err.message || "Network exception";
        console.warn(`Model ${currentModel} call failed: ${lastErrorMessage}. Trying next candidate...`);
      }
    }

    if (!successfulData) {
      return NextResponse.json(
        {
          error: `Mô hình AI hiện đang quá tải từ phía máy chủ (${lastErrorMessage}). Vui lòng bấm thử lại sau giây lát.`,
        },
        { status: 503 }
      );
    }

    const choice = successfulData.choices?.[0];
    let content = choice?.message?.content || choice?.message?.reasoning || "";
    let reasoning = choice?.message?.reasoning || "";
    let isTruncated = choice?.finish_reason === "length";

    // Auto-continuation if generation hit the token limit mid-sentence
    if (isTruncated && content.length > 50) {
      try {
        const continuationMessages = [
          ...apiMessages,
          { role: "assistant" as const, content },
          {
            role: "user" as const,
            content:
              "Bạn vừa bị ngắt câu do chạm giới hạn token. Hãy viết tiếp nối liền chính xác từ chữ cuối cùng bị ngắt, hoàn thiện nốt phần bài giải còn lại một cách cô đọng, không lặp lại đoạn trước.",
          },
        ];
        const continueRes = await fetch(`${baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "AI Olympiad VN Academic Assistant Continuation",
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: continuationMessages,
            temperature: 0.2,
            max_tokens: 2048,
          }),
        });
        if (continueRes.ok) {
          const continueData = await continueRes.json();
          const contContent =
            continueData.choices?.[0]?.message?.content ||
            continueData.choices?.[0]?.message?.reasoning ||
            "";
          if (contContent) {
            content += "\n\n" + contContent;
            isTruncated = continueData.choices?.[0]?.finish_reason === "length";
          }
        }
      } catch (contErr) {
        console.warn("Auto-continuation skipped on exception:", contErr);
      }
    }

    return NextResponse.json({
      success: true,
      model: successfulData.model || selectedModel,
      explanation: content,
      reasoning: reasoning,
      truncated: isTruncated,
      usage: successfulData.usage,
    });
  } catch (error: any) {
    console.error("API Explain Route Exception:", error);
    return NextResponse.json(
      {
        error:
          error?.message || "Đã xảy ra lỗi không xác định khi gọi trợ lý AI.",
      },
      { status: 500 }
    );
  }
}
