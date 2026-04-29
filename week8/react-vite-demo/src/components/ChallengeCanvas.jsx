import { useRef, useEffect } from "react";

function ChallengeCanvas() {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // circle
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(300, 300, 290, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        // rect
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.strokeRect(100, 100, 400, 400);

        ctx.font = "80px arial";
        ctx.fillStyle = "white";
        ctx.fillText("Challenge", 120, 320);
    });

    return (
        <canvas ref={canvasRef} width={600} height={600}>
            Your browser doesn't support HTML5 Canvas.
        </canvas>
    );
}

export default ChallengeCanvas;