import { execSync } from "node:child_process"
import { rmSync } from "node:fs"
import { platform } from "node:os"

function killPort(port) {
  if (platform() !== "win32") {
    try {
      execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: "ignore" })
    } catch {
      // Port already free.
    }
    return
  }

  try {
    const output = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8" })
    const pids = new Set()

    for (const line of output.split("\n")) {
      const match = line.trim().match(/LISTENING\s+(\d+)/)
      if (match) {
        pids.add(match[1])
      }
    }

    for (const pid of pids) {
      execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" })
      console.log(`Stopped process on port ${port} (PID ${pid})`)
    }
  } catch {
    // Port already free.
  }
}

killPort(3000)
rmSync(".next", { recursive: true, force: true })
console.log("Removed .next — you can now run: npm run dev")
