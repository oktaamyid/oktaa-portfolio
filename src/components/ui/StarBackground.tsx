"use client";

import { useEffect, useRef } from "react";

interface StarBackgroundProps {
     starColor?: string;
     starSize?: number;
     starMinScale?: number;
     overflowThreshold?: number;
     starCountMultiplier?: number;
}

const StarBackground = ({
     starColor = "#fff",
     starSize = 3,
     starMinScale = 0.1,
     overflowThreshold = 50,
     starCountMultiplier = 24,
}: StarBackgroundProps) => {
     const canvasRef = useRef<HTMLCanvasElement>(null);

     useEffect(() => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const context = canvas.getContext("2d");
          if (!context) return;

          let scale = window.devicePixelRatio || 1;
          let width = window.innerWidth * scale;
          let height = window.innerHeight * scale;

          const stars: { x: number; y: number; z: number }[] = [];
          let pointerX: number | null = null;
          let pointerY: number | null = null;
          const velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };
          let touchInput = false;

          const starCount = (window.innerWidth + window.innerHeight) / starCountMultiplier;

          function generate() {
               for (let i = 0; i < starCount; i++) {
                    stars.push({
                         x: 0,
                         y: 0,
                         z: starMinScale + Math.random() * (1 - starMinScale),
                    });
               }
          }

          function placeStar(star: { x: number; y: number; z: number }) {
               star.x = Math.random() * width;
               star.y = Math.random() * height;
          }

          function recycleStar(star: { x: number; y: number; z: number }) {
               let direction = "z";
               const vx = Math.abs(velocity.x);
               const vy = Math.abs(velocity.y);

               if (vx > 1 || vy > 1) {
                    let axis;
                    if (vx > vy) {
                         axis = Math.random() < vx / (vx + vy) ? "h" : "v";
                    } else {
                         axis = Math.random() < vy / (vx + vy) ? "v" : "h";
                    }

                    if (axis === "h") {
                         direction = velocity.x > 0 ? "l" : "r";
                    } else {
                         direction = velocity.y > 0 ? "t" : "b";
                    }
               }

               star.z = starMinScale + Math.random() * (1 - starMinScale);

               if (direction === "z") {
                    star.z = 0.1;
                    star.x = Math.random() * width;
                    star.y = Math.random() * height;
               } else if (direction === "l") {
                    star.x = -overflowThreshold;
                    star.y = height * Math.random();
               } else if (direction === "r") {
                    star.x = width + overflowThreshold;
                    star.y = height * Math.random();
               } else if (direction === "t") {
                    star.x = width * Math.random();
                    star.y = -overflowThreshold;
               } else if (direction === "b") {
                    star.x = width * Math.random();
                    star.y = height + overflowThreshold;
               }
          }

          function resize() {
               scale = window.devicePixelRatio || 1;
               width = window.innerWidth * scale;
               height = window.innerHeight * scale;
               canvas!.width = width;
               canvas!.height = height;
               stars.forEach(placeStar);
          }

          function step() {
               if (!context) return;
               context.clearRect(0, 0, width, height);
               update();
               render();
               requestAnimationFrame(step);
          }

          function update() {
               velocity.tx *= 0.96;
               velocity.ty *= 0.96;
               velocity.x += (velocity.tx - velocity.x) * 0.8;
               velocity.y += (velocity.ty - velocity.y) * 0.8;

               stars.forEach((star) => {
                    star.x += velocity.x * star.z;
                    star.y += velocity.y * star.z;
                    star.x += (star.x - width / 2) * velocity.z * star.z;
                    star.y += (star.y - height / 2) * velocity.z * star.z;
                    star.z += velocity.z;

                    if (
                         star.x < -overflowThreshold ||
                         star.x > width + overflowThreshold ||
                         star.y < -overflowThreshold ||
                         star.y > height + overflowThreshold
                    ) {
                         recycleStar(star);
                    }
               });
          }

          function render() {
               if (!context) return;
               stars.forEach((star) => {
                    context.beginPath();
                    context.lineCap = "round";
                    context.lineWidth = starSize * star.z * scale;
                    context.globalAlpha = 0.5 + 0.5 * Math.random();
                    context.strokeStyle = starColor;

                    context.beginPath();
                    context.moveTo(star.x, star.y);

                    let tailX = velocity.x * 2;
                    let tailY = velocity.y * 2;

                    if (Math.abs(tailX) < 0.1) tailX = 0.5;
                    if (Math.abs(tailY) < 0.1) tailY = 0.5;

                    context.lineTo(star.x + tailX, star.y + tailY);
                    context.stroke();
               });
          }

          function movePointer(x: number, y: number) {
               if (typeof pointerX === "number" && typeof pointerY === "number") {
                    const ox = x - pointerX;
                    const oy = y - pointerY;
                    velocity.tx = velocity.tx + (ox / 8) * scale * (touchInput ? 1 : -1);
                    velocity.ty = velocity.ty + (oy / 8) * scale * (touchInput ? 1 : -1);
               }
               pointerX = x;
               pointerY = y;
          }

          function onMouseMove(event: MouseEvent) {
               touchInput = false;
               movePointer(event.clientX * scale, event.clientY * scale);
          }

          function onTouchMove(event: TouchEvent) {
               touchInput = true;
               movePointer(event.touches[0].clientX * scale, event.touches[0].clientY * scale);
               event.preventDefault();
          }

          function onMouseLeave() {
               pointerX = null;
               pointerY = null;
          }

          generate();
          resize();
          step();

          window.addEventListener("resize", resize);
          canvas.addEventListener("mousemove", onMouseMove);
          canvas.addEventListener("touchmove", onTouchMove);
          canvas.addEventListener("touchend", onMouseLeave);
          document.addEventListener("mouseleave", onMouseLeave);

          return () => {
               window.removeEventListener("resize", resize);
               canvas.removeEventListener("mousemove", onMouseMove);
               canvas.removeEventListener("touchmove", onTouchMove);
               canvas.removeEventListener("touchend", onMouseLeave);
               document.removeEventListener("mouseleave", onMouseLeave);
          };
     }, [starColor, starSize, starMinScale, overflowThreshold, starCountMultiplier]);

     return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

export default StarBackground;