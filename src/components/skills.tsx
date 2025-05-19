// "use client"
// import { useRef, useEffect, useState } from "react"
// import { Cpu, Database, Code, Activity, Settings, Users, Star, GitMerge } from "lucide-react"
// import type Matter from "matter-js"

// // Define types for Matter.js
// declare module 'matter-js' {
//   interface Body {
//     skillIndex?: number;
//   }
// }

// type MatterBody = Matter.Body
// type MatterEngine = Matter.Engine
// type MatterRender = Matter.Render
// type MatterMouseConstraint = Matter.MouseConstraint
// type MatterComposite = Matter.Composite

// interface Skill {
//   name: string;
//   shape: string;
//   icon: React.ReactNode;
//   color: string;
//   description: string;
// }

// const SkillsPage: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const requestRef = useRef<number | null>(null)
//   const [selectedSkill, setSelectedSkill] = useState<number | null>(null)
//   const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)
//   const [gravity, setGravity] = useState<number>(0)
//   const [isMobile, setIsMobile] = useState<boolean>(false)
//   const [isInitialized, setIsInitialized] = useState<boolean>(false)
//   const [debugInfo, setDebugInfo] = useState<string>("")
//   const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

//   // Store Matter.js objects in refs
//   const engineRef = useRef<MatterEngine | null>(null)
//   const renderRef = useRef<MatterRender | null>(null)
//   const worldRef = useRef<MatterComposite | null>(null)
//   const bodiesRef = useRef<MatterBody[]>([])
//   const mouseConstraintRef = useRef<MatterMouseConstraint | null>(null)
//   const wallsRef = useRef<MatterBody[]>([])
//   const wallThickness = 50

//   const skills: Skill[] = [
//     {
//       name: "3D Modeling (SolidWorks)",
//       shape: "square",
//       icon: <Cpu size={24} />,
//       color: "#4285F4",
//       description: "Creating detailed 3D models and assemblies using SolidWorks for mechanical design.",
//     },
//     {
//       name: "Finite Element Analysis (ANSYS)",
//       shape: "circle",
//       icon: <Activity size={24} />,
//       color: "#EA4335",
//       description: "Performing stress analysis, thermal studies, and structural simulations using ANSYS.",
//     },
//     {
//       name: "Simulation and Analysis",
//       shape: "triangle",
//       icon: <GitMerge size={24} />,
//       color: "#FBBC05",
//       description: "Developing simulations to predict real-world behavior of mechanical systems.",
//     },
//     {
//       name: "Robotics Design",
//       shape: "pentagon",
//       icon: <Settings size={24} />,
//       color: "#34A853",
//       description: "Designing robotic systems including mechanical structures, control systems, and integration.",
//     },
//     {
//       name: "Manufacturing Techniques",
//       shape: "hexagon",
//       icon: <Database size={24} />,
//       color: "#7B68EE",
//       description: "Knowledge of various manufacturing processes including CNC machining, 3D printing, and injection molding.",
//     },
//     {
//       name: "Project Management",
//       shape: "octagon",
//       icon: <Users size={24} />,
//       color: "#FF7043",
//       description: "Leading engineering projects from concept to completion, managing timelines and resources.",
//     },
//     {
//       name: "Team Leadership",
//       shape: "star",
//       icon: <Star size={24} />,
//       color: "#9C27B0",
//       description: "Building and leading effective technical teams, fostering collaboration and innovation.",
//     },
//     {
//       name: "Programming (MATLAB)",
//       shape: "diamond",
//       icon: <Code size={24} />,
//       color: "#00BCD4",
//       description: "Developing algorithms and analysis tools using MATLAB for engineering applications.",
//     },
//   ]

//   // Check if device is mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768)
//     }
//     checkMobile()
//     window.addEventListener("resize", checkMobile)
//     return () => window.removeEventListener("resize", checkMobile)
//   }, [])

//   // Track container size
//   useEffect(() => {
//     const updateSize = () => {
//       if (containerRef.current) {
//         const rect = containerRef.current.getBoundingClientRect()
//         setContainerSize({ width: rect.width, height: rect.height })
//       }
//     }
//     updateSize()
//     window.addEventListener("resize", updateSize)
//     return () => window.removeEventListener("resize", updateSize)
//   }, [])

//   // Update walls and renderer on size change
//   useEffect(() => {
//     if (!engineRef.current || !worldRef.current || !renderRef.current) return
//     if (containerSize.width <= 0 || containerSize.height <= 0) return

//     const Matter = require('matter-js') // Safe to require here as initMatter ensures Matter.js is loaded
//     // Remove old walls
//     wallsRef.current.forEach((wall) => Matter.World.remove(worldRef.current, wall))
//     // Create new walls
//     const { width, height } = containerSize
//     const newWalls = [
//       Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, {
//         isStatic: true,
//         render: { fillStyle: "transparent" },
//       }),
//       Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, {
//         isStatic: true,
//         render: { fillStyle: "transparent" },
//       }),
//       Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, {
//         isStatic: true,
//         render: { fillStyle: "transparent" },
//       }),
//       Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, {
//         isStatic: true,
//         render: { fillStyle: "transparent" },
//       }),
//     ]
//     wallsRef.current = newWalls
//     Matter.Composite.add(worldRef.current, newWalls)

//     // Update render options
//     renderRef.current.options.width = width
//     renderRef.current.options.height = height
//     if (renderRef.current.canvas) {
//       renderRef.current.canvas.width = width
//       renderRef.current.canvas.height = height
//     }
//   }, [containerSize])

//   // Initialize Matter.js
//   useEffect(() => {
//     const initMatter = async () => {
//       if (isInitialized || !containerRef.current || !canvasRef.current || containerSize.width <= 0 || containerSize.height <= 0) return
//       try {
//         const matterModule = await import('matter-js')
//         const Matter = matterModule.default
//         const { width, height } = containerSize
//         const engine = Matter.Engine.create({ gravity: { x: 0, y: gravity } })
//         engineRef.current = engine
//         worldRef.current = engine.world
//         const render = Matter.Render.create({
//           element: containerRef.current,
//           engine: engine,
//           canvas: canvasRef.current,
//           options: {
//             width,
//             height,
//             wireframes: false,
//             background: "transparent",
//             pixelRatio: window.devicePixelRatio || 1,
//           },
//         })
//         renderRef.current = render
//         const skillSize = isMobile ? 60 : 80
//         const bodies: MatterBody[] = []
//         const cols = isMobile ? 2 : 4
//         const rows = Math.ceil(skills.length / cols)
//         const cellWidth = width / cols
//         const cellHeight = height / rows
//         skills.forEach((skill, index) => {
//           const col = index % cols
//           const row = Math.floor(index / cols)
//           const x = col * cellWidth + cellWidth / 2
//           const y = row * cellHeight + cellHeight / 2
//           let body
//           switch (skill.shape) {
//             case "circle":
//               body = Matter.Bodies.circle(x, y, skillSize / 2, {
//                 restitution: 0.8,
//                 friction: 0.01,
//                 frictionAir: 0.001,
//                 render: { fillStyle: skill.color, strokeStyle: "#FFFFFF", lineWidth: 2 },
//               })
//               break
//             case "square":
//               body = Matter.Bodies.rectangle(x, y, skillSize, skillSize, {
//                 restitution: 0.8,
//                 friction: 0.01,
//                 frictionAir: 0.001,
//                 render: { fillStyle: skill.color, strokeStyle: "#FFFFFF", lineWidth: 2 },
//               })
//               break
//             case "triangle":
//               body = Matter.Bodies.polygon(x, y, 3, skillSize / 1.5, {
//                 restitution: 0.8,
//                 friction: 0.01,
//                 frictionAir: 0.001,
//                 render: { fillStyle: skill.color, strokeStyle: "#FFFFFF", lineWidth: 2 },
//               })
//               break
//             case "pentagon":
//               body = Matter.Bodies.polygon(x, y, 5, skillSize / 2, {
//                 restitution: 0.8,
//                 friction: 0.01,
//                 frictionAir: 0.001,
//                 render: { fillStyle: skill.color, strokeStyle: "#FFFFFF", lineWidth: 2 },
//               })
//               break
//             case "hexagon":
//               body = Matter.Bodies.polygon(x, y, 6, skillSize / 2, {
//                 restitution: 0.8,
//                 friction: 0.01,
//                 frictionAir: 0.001,
//                 render: { fillStyle: skill.color, strokeStyle: "#FFFFFF", lineWidth: 2 },
//               })
//               break
//             case "octagon":
//               body = Matter.Bodies.polygon(x, y, 8, skillSize / 2, {
//                 restitution: 0.8,
//                 friction: 0.01,
//                 frictionAir: 0.001,
//                 render: { fillStyle: skill.color, strokeStyle: "#FFFFFF", lineWidth: 2 },
//               })
//               break
//             case "star":
//               body = Matter.Bodies.circle(x, y, skillSize / 2, {
//                 restitution: 0.8,
//                 friction: 0.01,
//                 frictionAir: 0.001,
//                 render: {
//                   fillStyle: skill.color,
//                   strokeStyle: "#FFFFFF",
//                   lineWidth: 2,
//                   sprite: { texture: createStarImage(skillSize, skill.color), xScale: 1, yScale: 1 },
//                 },
//               })
//               break
//             case "diamond":
//               body = Matter.Bodies.rectangle(x, y, skillSize, skillSize, {
//                 restitution: 0.8,
//                 friction: 0.01,
//                 frictionAir: 0.001,
//                 angle: Math.PI / 4,
//                 render: { fillStyle: skill.color, strokeStyle: "#FFFFFF", lineWidth: 2 },
//               })
//               break
//             default:
//               body = Matter.Bodies.rectangle(x, y, skillSize, skillSize, {
//                 restitution: 0.8,
//                 friction: 0.01,
//                 frictionAir: 0.001,
//                 render: { fillStyle: skill.color, strokeStyle: "#FFFFFF", lineWidth: 2 },
//               })
//           }
//           body.skillIndex = index
//           body.label = skill.name
//           Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 4, y: (Math.random() - 0.5) * 4 })
//           Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05)
//           bodies.push(body)
//         })
//         Matter.Composite.add(engine.world, bodies)
//         bodiesRef.current = bodies
//         const mouse = Matter.Mouse.create(render.canvas)
//         const mouseConstraint = Matter.MouseConstraint.create(engine, {
//           mouse: mouse,
//           constraint: { stiffness: 0.2, render: { visible: false } },
//         })
//         mouseConstraintRef.current = mouseConstraint
//         Matter.Composite.add(engine.world, mouseConstraint)
//         render.mouse = mouse
//         Matter.Events.on(mouseConstraint, "mousedown", (event) => {
//           const mousePosition = event.mouse.position
//           const foundPhysics = Matter.Query.point(bodies, mousePosition)
//           if (foundPhysics.length > 0) {
//             const body = foundPhysics[0]
//             if (typeof body.skillIndex === 'number') {
//               setSelectedSkill(body.skillIndex)
//             }
//           } else {
//             setSelectedSkill(null)
//           }
//         })
//         Matter.Events.on(mouseConstraint, "mousemove", (event) => {
//           const mousePosition = event.mouse.position
//           const foundPhysics = Matter.Query.point(bodies, mousePosition)
//           if (foundPhysics.length > 0) {
//             const body = foundPhysics[0]
//             if (typeof body.skillIndex === 'number') {
//               setHoveredSkill(body.skillIndex)
//             }
//           } else {
//             setHoveredSkill(null)
//           }
//         })
//         Matter.Events.on(engine, 'collisionStart', (event) => {
//           const pairs = event.pairs
//           for (let i = 0; i < pairs.length; i++) {
//             const pair = pairs[i]
//             if (pair.bodyA.isStatic || pair.bodyB.isStatic) continue
//             if (Math.random() > 0.7) {
//               const bodyToAdjust = Math.random() > 0.5 ? pair.bodyA : pair.bodyB
//               const forceX = (Math.random() - 0.5) * 0.002
//               const forceY = (Math.random() - 0.5) * 0.002
//               Matter.Body.applyForce(bodyToAdjust, bodyToAdjust.position, { x: forceX, y: forceY })
//             }
//           }
//         })
//         Matter.Runner.run(Matter.Runner.create(), engine)
//         Matter.Render.run(render)
//         const addRandomForces = () => {
//           if (!bodiesRef.current || !engineRef.current) return
//           bodiesRef.current.forEach((body: MatterBody) => {
//             if (Math.random() > 0.95) {
//               const forceX: number = (Math.random() - 0.5) * 0.001
//               const forceY: number = (Math.random() - 0.5) * 0.001
//               Matter.Body.applyForce(body, body.position, { x: forceX, y: forceY })
//             }
//           })
//           setTimeout(addRandomForces, 500)
//         }
//         addRandomForces()
//         setIsInitialized(true)
//         setDebugInfo("Physics initialized successfully")
//       } catch (error) {
//         const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
//         setDebugInfo(`Error: ${errorMessage}`)
//         console.error("Matter.js initialization error:", error)
//       }
//     }
//     initMatter()
//     return () => {
//       if (requestRef.current) {
//         cancelAnimationFrame(requestRef.current)
//       }
//       if (renderRef.current) {
//         if (renderRef.current.canvas) {
//           renderRef.current.canvas.remove()
//         }
//         if (renderRef.current.textures) {
//           for (const texture in renderRef.current.textures) {
//             renderRef.current.textures[texture].remove && renderRef.current.textures[texture].remove()
//           }
//         }
//       }
//       if (engineRef.current && worldRef.current) {
//         // Handle Matter.js cleanup synchronously
//         void import('matter-js').then(matterModule => {
//           const Matter = matterModule.default
//           Matter.Composite.clear(worldRef.current!, false)
//           Matter.Engine.clear(engineRef.current!)
//         })
//       }
//     }
//   }, [containerSize, gravity, isInitialized, isMobile])

//   // Update gravity
//   useEffect(() => {
//     if (engineRef.current) {
//       engineRef.current.gravity.y = gravity
//       setDebugInfo(`Gravity updated to ${gravity}`)
//     }
//   }, [gravity])

//   // Create star image
//   const createStarImage = (size: number, color: string): string => {
//     const canvas = document.createElement('canvas')
//     canvas.width = size
//     canvas.height = size
//     const ctx = canvas.getContext('2d')
//     if (!ctx) return ''
//     ctx.beginPath()
//     ctx.fillStyle = color
//     const outerRadius = size / 2
//     const innerRadius = outerRadius / 2
//     const centerX = size / 2
//     const centerY = size / 2
//     const spikes = 5
//     let rot = Math.PI / 2 * 3
//     let x = centerX
//     let y = centerY
//     const step = Math.PI / spikes
//     ctx.beginPath()
//     ctx.moveTo(centerX, centerY - outerRadius)
//     for (let i = 0; i < spikes; i++) {
//       x = centerX + Math.cos(rot) * outerRadius
//       y = centerY + Math.sin(rot) * outerRadius
//       ctx.lineTo(x, y)
//       rot += step
//       x = centerX + Math.cos(rot) * innerRadius
//       y = centerY + Math.sin(rot) * innerRadius
//       ctx.lineTo(x, y)
//       rot += step
//     }
//     ctx.lineTo(centerX, centerY - outerRadius)
//     ctx.closePath()
//     ctx.fillStyle = color
//     ctx.fill()
//     ctx.strokeStyle = "#FFFFFF"
//     ctx.lineWidth = 2
//     ctx.stroke()
//     return canvas.toDataURL()
//   }

//   // Handle explosion
//   const handleExplode = async () => {
//     if (!engineRef.current || !bodiesRef.current.length) return
//     const matterModule = await import('matter-js')
//     const Matter = matterModule.default
//     bodiesRef.current.forEach((body) => {
//       if (!containerRef.current) return
//       const centerX = containerRef.current.clientWidth / 2
//       const centerY = containerRef.current.clientHeight / 2
//       const forceX = (body.position.x - centerX) * 0.0015
//       const forceY = (body.position.y - centerY) * 0.0015
//       Matter.Body.applyForce(body, body.position, { x: forceX, y: forceY })
//     })
//     setDebugInfo("Explosion applied")
//   }

//   // Handle reset
//   const handleReset = async () => {
//     if (!engineRef.current || !bodiesRef.current.length || !containerRef.current) return
//     const matterModule = await import('matter-js')
//     const Matter = matterModule.default
//     const width = containerRef.current.clientWidth
//     const height = containerRef.current.clientHeight
//     const cols = isMobile ? 2 : 4
//     const rows = Math.ceil(skills.length / cols)
//     const cellWidth = width / cols
//     const cellHeight = height / rows
//     bodiesRef.current.forEach((body, index) => {
//       const col = index % cols
//       const row = Math.floor(index / cols)
//       const x = col * cellWidth + cellWidth / 2
//       const y = row * cellHeight + cellHeight / 2
//       Matter.Body.setPosition(body, { x, y })
//       Matter.Body.setVelocity(body, { x: 0, y: 0 })
//       Matter.Body.setAngularVelocity(body, 0)
//       setTimeout(() => {
//         Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 4, y: (Math.random() - 0.5) * 4 })
//         Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05)
//       }, 100)
//     })
//     setDebugInfo("Positions reset")
//   }

//   // Render shape legend
//   const renderShapeLegend = (): React.ReactNode => {
//     const uniqueShapes = Array.from(new Set(skills.map((skill) => skill.shape)))
//     return (
//       <div className="bg-white bg-opacity-80 p-3 rounded-lg shadow-lg">
//         <h3 className="text-sm font-bold mb-2">Shape Legend</h3>
//         <div className="grid grid-cols-2 gap-2 text-xs">
//           {uniqueShapes.map((shape) => {
//             const skill = skills.find((s) => s.shape === shape)
//             if (!skill) return null
//             return (
//               <div key={shape} className="flex items-center gap-1">
//                 <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: skill.color }}></span>
//                 <span>{shape.charAt(0).toUpperCase() + shape.slice(1)}</span>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 overflow-hidden p-4">
//       <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">Technical Skills</h1>
//       <p className="text-gray-600 text-center mb-4">Drag, drop, and explore my engineering expertise</p>
//       <div className="w-full max-w-4xl flex flex-wrap justify-center gap-2 mb-4">
//         {skills.map((skill, index) => (
//           <div
//             key={index}
//             className="flex items-center gap-1 bg-white bg-opacity-80 px-2 py-1 rounded-md text-xs md:text-sm"
//             style={{ borderLeft: `4px solid ${skill.color}` }}
//             onClick={() => setSelectedSkill(index === selectedSkill ? null : index)}
//           >
//             <span className="font-medium">{skill.shape.charAt(0).toUpperCase() + skill.shape.slice(1)}:</span>{" "}
//             {skill.name}
//           </div>
//         ))}
//       </div>
//       <div
//         ref={containerRef}
//         className="relative w-full max-w-4xl h-[60vh] md:h-[70vh] border border-gray-200 rounded-xl overflow-hidden bg-white bg-opacity-30"
//         style={{ touchAction: "none" }}
//       >
//         <canvas ref={canvasRef} className="absolute inset-0" />
//         <div
//           className={`absolute ${isMobile ? "bottom-4 left-4 right-4" : "top-4 left-4"} bg-white bg-opacity-90 p-3 rounded-lg text-gray-800 z-10 shadow-lg`}
//         >
//           <h2 className="text-sm md:text-base font-bold mb-2">Physics Controls</h2>
//           <div className="mb-2">
//             <label className="block text-xs md:text-sm mb-1">Gravity: {gravity.toFixed(1)}</label>
//             <input
//               type="range"
//               min="-0.5"
//               max="1"
//               step="0.05"
//               value={gravity}
//               onChange={(e) => setGravity(Number.parseFloat(e.target.value))}
//               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//             />
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={handleExplode}
//               className="px-2 py-1 bg-amber-500 hover:bg-amber-600 rounded text-white text-xs md:text-sm transition-colors"
//             >
//               Explode!
//             </button>
//             <button
//               onClick={handleReset}
//               className="px-2 py-1 bg-teal-500 hover:bg-teal-600 rounded text-white text-xs md:text-sm transition-colors"
//             >
//               Reset
//             </button>
//           </div>
//         </div>
//         {!isMobile && <div className="absolute top-4 right-4 z-10">{renderShapeLegend()}</div>}
//         {(hoveredSkill !== null || selectedSkill !== null) && (
//           <div
//             className={`absolute ${isMobile ? "top-4 left-4 right-4" : "bottom-4 right-4 w-64"} bg-white bg-opacity-90 p-3 rounded-lg text-gray-800 z-10 shadow-lg transition-all duration-300 ease-in-out`}
//           >
//             <div className="flex items-center gap-2 mb-1">
//               <span className="p-1 rounded-full" style={{ backgroundColor: skills[selectedSkill || hoveredSkill || 0].color }}>
//                 {skills[selectedSkill || hoveredSkill || 0].icon}
//               </span>
//               <h3 className="text-sm md:text-base font-bold">{skills[selectedSkill || hoveredSkill || 0].name}</h3>
//             </div>
//             <p className="text-xs md:text-sm">{skills[selectedSkill || hoveredSkill || 0].description}</p>
//           </div>
//         )}
//       </div>
//       <div className="mt-4 text-center text-sm text-gray-600">
//         <p className="font-bold">👆 Drag shapes to interact. Adjust gravity to change behavior.</p>
//       </div>
//     </div>
//   )
// }

// export default SkillsPage