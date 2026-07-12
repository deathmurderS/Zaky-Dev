import { NextResponse } from "next/server";
import os from "os";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function isVercel(): boolean {
  return !!process.env.VERCEL;
}

export async function GET() {
  try {
    const runningOnVercel = isVercel();
    const platform = runningOnVercel ? "vercel-serverless" : os.platform();
    const hostname = runningOnVercel ? process.env.VERCEL_URL || "vercel.app" : os.hostname();

    // CPU
    const cpus = os.cpus();
    const cpuCount = cpus.length;
    const cpuLoad = os.loadavg()[0];
    const cpuPercent = runningOnVercel ? "N/A (Vercel)" : `${Math.min(Math.round((cpuLoad / cpuCount) * 100), 100)}`;

    // RAM
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const usedMemGB = Math.round((usedMem / 1024 / 1024 / 1024) * 10) / 10;
    const totalMemGB = Math.round((totalMem / 1024 / 1024 / 1024) * 10) / 10;

    // Uptime
    const uptimeSeconds = os.uptime();
    const days = Math.floor(uptimeSeconds / 86400);
    const hours = Math.floor((uptimeSeconds % 86400) / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const uptimeStr = `${days}d ${hours}h ${minutes}m`;

    // Disk — fallback on Vercel
    let diskUsed = "N/A";
    let diskTotal = "N/A";
    if (!runningOnVercel) {
      try {
        const { execSync } = await import("child_process");
        const df = execSync("df -k / | tail -1").toString().trim().split(/\s+/);
        diskTotal = `${Math.round(parseInt(df[1]) / 1024 / 1024)} GB`;
        diskUsed = `${Math.round(parseInt(df[2]) / 1024 / 1024)} GB`;
      } catch {
        diskUsed = "N/A";
        diskTotal = "N/A";
      }
    }

    // Docker
    let dockerRunning: string | number = "N/A";
    let dockerTotal: string | number = "N/A";
    if (!runningOnVercel) {
      try {
        const { execSync } = await import("child_process");
        const containers = execSync("docker ps -q").toString().trim();
        dockerRunning = containers ? containers.split("\n").length : 0;
        const all = execSync("docker ps -aq").toString().trim();
        dockerTotal = all ? all.split("\n").length : 0;
      } catch {
        dockerRunning = 0;
        dockerTotal = 0;
      }
    }

    return NextResponse.json({
      environment: runningOnVercel ? "Vercel Serverless (limited OS data)" : "VPS / Local",
      cpu: {
        usage: cpuPercent,
        cores: cpuCount,
        note: runningOnVercel ? "CPU metrics not available on Vercel serverless" : "Real CPU load",
      },
      ram: {
        used: runningOnVercel ? "N/A" : usedMemGB,
        total: runningOnVercel ? "N/A" : totalMemGB,
        unit: "GB",
        note: runningOnVercel ? "RAM metrics are container-level on Vercel" : "Real RAM usage",
      },
      disk: { used: diskUsed, total: diskTotal },
      uptime: runningOnVercel ? "N/A (serverless)" : uptimeStr,
      docker: { running: dockerRunning, total: dockerTotal },
      responseTime: "< 50ms",
      hostname,
      platform,
      vercel: {
        region: process.env.VERCEL_REGION || "unknown",
        environment: process.env.VERCEL_ENV || "unknown",
      },
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Status API error:", error);
    return NextResponse.json(
      { error: "Failed to get server status" },
      { status: 500 }
    );
  }
}
