export default function Glitch() {
  return (
    <div className="glitch-container">
      <div className="glitch-background"></div>

      <style jsx>{`
        .glitch-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: white;
        }

        .glitch-background {
          position: absolute;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          width: 200%;
          height: 200%;
          background: repeating-linear-gradient(
            45deg,
            #000,
            #000 10px,
            #fff 10px,
            #fff 20px
          );
          animation: glitch 0.2s infinite;
        }

        .content {
          position: relative;
          z-index: 1;
          text-align: center;
          mix-blend-mode: difference;
          color: white;
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        .glitch-background::before,
        .glitch-background::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: inherit;
          mix-blend-mode: difference;
        }

        .glitch-background::before {
          left: 2px;
          animation: glitch-left 0.3s infinite steps(2) alternate-reverse;
        }

        .glitch-background::after {
          left: -2px;
          animation: glitch-right 0.27s infinite steps(2) alternate-reverse;
        }

        @keyframes glitch-left {
          0% {
            clip-path: inset(0 0 0 0);
          }
          100% {
            clip-path: inset(0 87% 0 0);
          }
        }

        @keyframes glitch-right {
          0% {
            clip-path: inset(0 0 0 0);
          }
          100% {
            clip-path: inset(0 0 0 87%);
          }
        }
      `}</style>
    </div>
  );
}
