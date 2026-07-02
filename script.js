const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

const contactForm = document.getElementById("contactForm");
const responseDiv = document.getElementById("responseMessage");

function showResponse(type, message) {
  responseDiv.className = `response-message ${type}`;
  responseDiv.innerText = message;
}

if (contactForm && responseDiv) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("visitorName").value;
    const email = document.getElementById("visitorEmail").value;
    const message = document.getElementById("visitorMessage").value;

    showResponse(
      "info",
      "AI 에이전트가 질문을 분석 중입니다... 잠시만 기다려주세요."
    );

    // Replace this URL with your Make.com Custom Webhook URL.
    const makeWebhookUrl = "https://hook.us1.make.com/your_unique_webhook_id";

    try {
      const response = await fetch('6xy87wlht85pdbyjso4as3n5zibk3xp8@hook.eu1.make.com', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          visitor_name: name,
          visitor_email: email,
          visitor_message: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Server response failed");
      }

      showResponse(
        "success",
        "질문이 성공적으로 접수되었습니다! 입력하신 메일로 AI의 답변이 곧 발송됩니다."
      );
      contactForm.reset();
    } catch (error) {
      showResponse(
        "error",
        "접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    }
  });
}
