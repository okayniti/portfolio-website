// NitiGPT content - personalized for Niti Kanoongo
export interface NitiGPTContent {
  section: string
  content: string
}

export const nitiGptContent: Record<string, string> = {
  hero: `Hey there! I'm NitiGPT — your friendly guide to this portfolio.

I'll share insider context as you scroll. The kind of stuff that doesn't fit in bullet points.

Niti's currently a B.Tech student at VIT Bhopal, deep into AI/ML and building things that matter.`,

  about: `Fun fact: Niti has competed in 30+ Model United Nations conferences and even served as Chairperson.

That debate background? It shows in how she approaches problems — always considering multiple perspectives before diving into code.

Also, she's solved 900+ problems on LeetCode and CodeChef. Yeah, she likes puzzles.`,

  work: `Each project here solved a real problem — not just a tutorial exercise.

The Bone Fracture project? Came from genuinely wanting to help doctors work faster.
PhishGuard? Because phishing emails are annoying AND dangerous.

Click around to see the full stories.`,

  contact: `Niti's inbox is always open for interesting conversations.

Whether it's AI, web dev, competitive programming, or just saying hi — she'll get back within 24 hours.

Pro tip: mentioning MUNs or hackathons is an instant conversation starter.`,
}

export const getProjectContext = (projectId: string): string => {
  return `Here's some insider context about this project...`
}
