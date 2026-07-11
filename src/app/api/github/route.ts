import { NextResponse } from "next/server";

const GITHUB_USERNAME = "deathmurderS";

export async function GET() {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };

    // Ambil profile & repos paralel
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { headers }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error("GitHub API error");
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    // Hitung total stars
    const totalStars = repos.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0);
    const totalForks = repos.reduce((sum: number, repo: any) => sum + (repo.forks_count || 0), 0);

    // Filter project repos (bukan fork, bukan dotfiles)
    const projectRepos = repos
      .filter((r: any) => !r.fork && r.name !== ".github" && r.name !== user.login)
      .slice(0, 6)
      .map((r: any) => ({
        name: r.name,
        description: r.description,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        url: r.html_url,
        updatedAt: r.updated_at,
      }));

    return NextResponse.json({
      profile: {
        name: user.name || user.login,
        login: user.login,
        avatar: user.avatar_url,
        bio: user.bio,
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
      },
      stats: {
        totalStars,
        totalForks,
        totalRepos: user.public_repos,
      },
      repos: projectRepos,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}