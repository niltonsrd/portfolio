/* ===============================
LOADING SCREEN
=============================== */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader-wrapper")

    if (loader) {

        loader.style.opacity = "0"

        setTimeout(() => {
            loader.style.display = "none"
        }, 500)

    }

})

/* ===============================
SCROLL PROGRESS BAR
=============================== */

const progressBar = document.querySelector(".progress-bar")

window.addEventListener("scroll", () => {

    if (!progressBar) return

    const scrollTop = document.documentElement.scrollTop
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight

    const scrolled = (scrollTop / height) * 100

    progressBar.style.width = scrolled + "%"

})

/* ===============================
NAVBAR SCROLL EFFECT
=============================== */

const navbar = document.querySelector(".navbar")

window.addEventListener("scroll", () => {

    if (!navbar) return

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(20,20,40,0.9)"
        navbar.style.backdropFilter = "blur(25px)"

    } else {

        navbar.style.background = "rgba(20,20,40,0.6)"

    }

})

/* ===============================
TYPING EFFECT (MELHORADO)
=============================== */

const typingElement = document.querySelector(".typing-text")

if (typingElement) {

    const words = [
        "Full Stack Developer",
        "Python Developer",
        "Web Developer",
        "Software Engineer"
    ]

    let wordIndex = 0
    let charIndex = 0
    let deleting = false

    function type() {

        const currentWord = words[wordIndex]

        if (!deleting) {

            typingElement.textContent = currentWord.substring(0, charIndex + 1)

            charIndex++

            if (charIndex === currentWord.length) {

                deleting = true
                setTimeout(type, 1200)
                return

            }

        } else {

            typingElement.textContent = currentWord.substring(0, charIndex - 1)

            charIndex--

            if (charIndex === 0) {

                deleting = false
                wordIndex++

                if (wordIndex === words.length) {
                    wordIndex = 0
                }

            }

        }

        setTimeout(type, deleting ? 40 : 80)

    }

    type()

}

/* ===============================
MOBILE MENU
=============================== */

const hamburger = document.querySelector(".hamburger")
const navLinks = document.querySelector(".nav-links")

if (hamburger) {

    hamburger.addEventListener("click", () => {

        navLinks.classList.toggle("active")

    })

}

const wrapper = document.querySelector(".pc-card-wrapper")

let currentX = 50
let currentY = 50

let targetX = 50
let targetY = 50

function animate() {

    currentX += (targetX - currentX) * 0.07
    currentY += (targetY - currentY) * 0.07

    wrapper.style.setProperty("--pointer-x", currentX + "%")
    wrapper.style.setProperty("--pointer-y", currentY + "%")

    const centerX = currentX - 50
    const centerY = currentY - 50

    wrapper.style.setProperty("--rotate-x", (-centerX / 3.5) + "deg")
    wrapper.style.setProperty("--rotate-y", (centerY / 3) + "deg")

    const dist = Math.sqrt(centerX * centerX + centerY * centerY) / 50

    wrapper.style.setProperty("--card-opacity", dist)

    requestAnimationFrame(animate)

}

animate()

wrapper.addEventListener("mousemove", e => {

    const rect = wrapper.getBoundingClientRect()

    targetX = ((e.clientX - rect.left) / rect.width) * 100
    targetY = ((e.clientY - rect.top) / rect.height) * 100

})

wrapper.addEventListener("mouseleave", () => {

    targetX = 50
    targetY = 50

})

/* ===============================
PARTICLES BACKGROUND
=============================== */

const canvas = document.getElementById("particles")

if (canvas) {

    const ctx = canvas.getContext("2d")

    let particlesArray = []
    let particleCount = 120

    function resizeCanvas() {

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        initParticles()

    }

    window.addEventListener("resize", resizeCanvas)

    class Particle {

        constructor() {

            this.x = Math.random() * canvas.width
            this.y = Math.random() * canvas.height

            this.size = Math.random() * 2

            this.speedX = Math.random() * 0.4 - 0.2
            this.speedY = Math.random() * 0.4 - 0.2

        }

        update() {

            this.x += this.speedX
            this.y += this.speedY

            if (this.x > canvas.width) this.x = 0
            if (this.x < 0) this.x = canvas.width

            if (this.y > canvas.height) this.y = 0
            if (this.y < 0) this.y = canvas.height

        }

        draw() {

            ctx.fillStyle = "#7c5cff"

            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.fill()

        }

    }

    function initParticles() {

        particlesArray = []

        for (let i = 0; i < particleCount; i++) {

            particlesArray.push(new Particle())

        }

    }

    function animateParticles() {

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particlesArray.forEach(p => {
            p.update()
            p.draw()
        })

        requestAnimationFrame(animateParticles)

    }

    resizeCanvas()
    animateParticles()

}

/* ===============================
SECTION SCROLL ANIMATION
=============================== */

const sections = document.querySelectorAll(".section")

if (sections.length) {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible")

            }

        })

    }, { threshold: 0.2 })

    sections.forEach(section => {
        observer.observe(section)
    })

}