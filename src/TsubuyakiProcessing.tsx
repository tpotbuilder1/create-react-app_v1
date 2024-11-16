"use client"

import React, { useRef, useEffect } from 'react'
import p5 from 'p5'

const TsubuyakiProcessing: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sketchRef.current) return

    const sketch = (p: p5) => {
      let t = 0
      const w = 400

      const mag = (x: number, y: number) => Math.sqrt(x * x + y * y)

      const a = (x: number, y: number, d = mag(x / 8 - 25, y / 8 - 25) ** 2 / 99) => {
        const k = x / 8 - 25
        const e = y / 8 - 25
        const q = x / 3 + k * 0.5 / Math.cos(y * 5) * Math.sin(d * d - t)
        const c = d / 2 - t / 8
        return [
          q * Math.sin(c) + e * Math.sin(d + k - t) + 200,
          (q + y / 8 + d * 9) * Math.cos(c) + 200
        ]
      }

      p.setup = () => {
        p.createCanvas(w, w)
      }

      p.draw = () => {
        p.background(6)
        p.stroke(255, 96)
        for (let y = 99; y < 300; y += 5) {
          for (let x = 99; x < 300; x++) {
            const [px, py] = a(x, y)
            p.point(px, py)
          }
        }
        t += Math.PI / 60
      }

      p.windowResized = () => {
        p.resizeCanvas(w, w)
      }
    }

    const p5Instance = new p5(sketch, sketchRef.current)

    return () => {
      p5Instance.remove()
    }
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#111] p-5">
      <div ref={sketchRef} className="border border-[#333] rounded-lg overflow-hidden shadow-lg" />
    </div>
  )
}

export default TsubuyakiProcessing

