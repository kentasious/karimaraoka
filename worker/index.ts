// サイトの入口。/api/contact へのフォーム送信だけをここで処理し、
// それ以外のページや画像はそのまま out/ のファイルを返す。

type EmailAddress = { email: string; name?: string };

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  EMAIL: {
    send(message: {
      to?: string | EmailAddress;
      from: string | EmailAddress;
      replyTo?: string | EmailAddress;
      subject: string;
      text: string;
    }): Promise<{ messageId: string }>;
  };
}

// 送信元アドレス（karimaraoka.com をCloudflareのメール送信に登録しておく必要がある）
const FROM: EmailAddress = { email: "form@karimaraoka.com", name: "karimaraoka.com" };
// 送り先（wrangler.jsonc の destination_address と同じアドレス。ほかの宛先には送れない設定になっている）
const TO = "karim2001514@gmail.com";

const LIMITS = { name: 100, email: 254, inquiry: 60, message: 5000 };

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

// 件名などに改行が混ざると、メールの見出し部分を書き換えられてしまうため取り除く
function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return json({ ok: false, error: "method_not_allowed" }, 405);
  }

  // 他のサイトから勝手にこのフォームを使われないよう、送信元のサイトを確認する
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json({ ok: false, error: "forbidden" }, 403);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const get = (key: string) => String(form.get(key) ?? "").trim();

  // スパム対策：人間には見えない欄に入力があれば、送ったふりをして何もしない
  if (get("_gotcha")) {
    return json({ ok: true });
  }

  const name = oneLine(get("name"));
  const email = oneLine(get("email"));
  const inquiry = oneLine(get("inquiry"));
  const message = get("message");

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (
    !name ||
    !message ||
    !validEmail ||
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    inquiry.length > LIMITS.inquiry ||
    message.length > LIMITS.message
  ) {
    return json({ ok: false, error: "invalid" }, 400);
  }

  const text = [
    "karimaraoka.com の依頼フォームからお問い合わせが届きました。",
    "このメールに返信すると、送り主に直接届きます。",
    "",
    `お名前：${name}`,
    `メール：${email}`,
    `ご依頼の種類：${inquiry || "（未選択）"}`,
    "",
    "内容：",
    message,
  ].join("\n");

  try {
    await env.EMAIL.send({
      to: TO,
      from: FROM,
      replyTo: { email, name },
      subject: `【ご依頼】${inquiry || "お問い合わせ"} — ${name}`,
      text,
    });
  } catch (error) {
    const e = error as { code?: string; message?: string };
    console.error("contact form send failed", e.code, e.message);
    return json({ ok: false, error: "send_failed" }, 502);
  }

  return json({ ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      return handleContact(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
