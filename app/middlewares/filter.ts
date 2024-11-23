import type { Context, Next } from "hono";

export const filterMiddleware = async (c: Context, next: Next) => {
	await next();
	const contentType = c.res.headers.get("Content-Type");
	if (contentType?.startsWith("text/html")) {
		const originalHtml = await c.res.text();
		const modifiedHtml = originalHtml.replace(
			"</head>",
			`<style>
        /* 炎が穏やかに揺らぐアニメーション */
        @keyframes flameFlicker {
          0% {
            filter: hue-rotate(-5deg) brightness(1) blur(4px);
            transform: scale(1.1) skewX(6deg);
          }
          50% {
            filter: hue-rotate(5deg) brightness(1.1) blur(2px);
            transform: scale(1.01) skewX(0deg);
          }
          100% {
            filter: hue-rotate(-5deg) brightness(1) blur(3px);
            transform: scale(1.05) skewX(-4deg);
          }
        }

        body {
          animation: flameFlicker 4s infinite alternate;
        }
      </style>
      </head>`,
		);
		c.res = new Response(modifiedHtml, {
			headers: { "Content-Type": "text/html" },
		});
	}
};
