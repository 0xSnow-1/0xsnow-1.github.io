---
title: "Cybernetics: The Art of Steering Goal-Oriented Agents"
date: 2026-11-17 00:00:00 +0000
categories: [Agents]
tags: [Goal, steering, agents]
description: "Stop giving agents tasks. Start steering them toward goals. My take on Harrison’s From tasks to goals, through the lens of cybernetics."
image:
  path: /assets/img/posts/celestial-compass-through-mist.jpg
  alt: "A robed figure steering a small boat through dark mist toward a distant star"
  width: 1200
  height: 628
---

The word cybernetics comes from the Greek "_kybernētēs_", meaning “steersman”. A steersman doesn’t plan every wave in advance, They hold a destination in mind and watch what the sea does, and keep correcting.

I believe that’s the best way to understand where agents are heading, For a long time we’ve been giving them tasks: "write this email",  "draft this blog", "fix this bug" It's as if we're plotting the whole route before leaving the harbor itself. But as agents get more capable, we’re starting to give them goals instead: "maintain a blog", "make this product successful"

And with a goal, you don’t control every move, you steer.

This post is my breakdown of Harrison’s article _[From tasks to goals](https://x.com/hwchase17/status/2122391663889039828)_ , plus how I connect it to cybernetics, We’ll go through what changes when you hand an agent a goal, six practical considerations for building around that, and why I think the real job of the person in control becomes steering instead of instructing.

First, the shift itself.
## Responsibilities Over Assignments

For us to move from tasks to goals, the practical shifts that are to be considered includes *Specifying an outcome* as opposed to *Specifying an action*. Instead of giving it assignments "Do x, and then do y, and after that proceed with Z" we give it an *Ongoing Responsibility* "Draft a Blog, and ensure that you've replied to any readers commenting under the post"

This changes what the agent acts, how it's built and the process of the communication between both The Controller (You) + the Agent


### Better Tasks, Better Outcomes

Previously, the Controller usually specifies a task (I want you to write an amazing email draft for me), Now, the Controller is specifying a Goal, the agent would then start iterating towards that goal by first *decomposing* the goal into specified tasks that it should do based off of the Controller's Query, shifting the focus onto BETTER tasks, considering that the possibility of reaching a BETTER outcome, fully depends on the quality of the tasks the agent can produce, (task engineering? (jk)) The selection of tasks based off of priority + brainstorming becomes a critical component towards a Goal-oriented Agent Architecture. the Tasks acts as a constant checklist that the agent iterates on based off of what a success criteria of each task consists of and for how long shall the agent maintain the iteration loop following the tasks until it could complete and finish an outcome.  Tasks may get updated by Aligning the LLM Agents to learn Latent Preference from the Controller's edits, otherwise called as "Feedback", and the idea here is providing feedback DURING the iteration loop, for the agent to then personalize/update on-going decomposed tasks aligning the agent more towards the Controller's preferences, therefore making this "Feedback" the primary learning mechanism, Achieving such a solution, can be the answer to making agents acquire the user's "Taste", "Judgement", "Strategy", "Brand voice", "Sales", Allowing for an increased reliability over long horizon-behaviour.

## Steering in Practice: Six Things Your Agent Needs

### Visibility: Seeing What the Agent Decides to Do.

We've already established that Tasks are becoming a critical component within a  Goal-oriented Agent Architecture, Unfortunately although we've reached a level where an Agent can become ambitious towards reaching a goal, we aren't in a stage where we could claim "Full Autonomy" yet fully depending on the agent, hence why being able to see what the agent is doing is a great tip when it comes to monitoring the types of tasks that has been generated + brainstormed by the agent in order to reach an agreement towards how the goal shall be moving forward from both the Controller and the Agent, this can be done through creative UX/UI implementations, a todo list an agent showcases before action , a live Dashboard or other ways we could "Monitor"


### Guardrails: Deciding What the Agent Can Touch 

The idea behind controlling tools Has to do with the fact, that when we assign a task to the agent (e.g Draft an email and send it to bob while setting up a date onto my calendar to meet bob by thursday 9pm of next week), we already have an assumption or a "sense" in what tools the agent would call, in the example above it's second nature to assume that the tools getting invoked would revolve around a "gmail_tool" and a "calendar_tool"

But when it comes to a goal-oriented agent that would require a query based off of an outcome, you do NOT know if the agent would call a "gmail_tool", or a "calendar_tool", "browser_tool" or ANY tools.

Hence why the point here is to be able to configure extra precautions and controls over what tools an agent can or cannot call, by doing this we ensure that for a specific goal it would not just act the way it wants to act especially when it comes to high-risks tasks that includes financials and private data.


### Asking for Directions: Letting the Agent Ask You

I believe that letting the agent ask you questions would mitigate the problem with "VAGUE" goals, and goals that could be sophisticated, typically when we don't add more emphasis towards the outcome we would wanna have (even when it comes to vague tasks) it's easy for the agent to start asking follow up clarifications, this shapes the tasks that has been deconstructed to be more Accurate, higher in quality, this consideration is about how could we implement a way for the BG agent to ask questions to humans, whether through Slack or a dedicated UI or possibly other gateways.


### Closing the Loop: Metrics and Feedback


The Agent must need to know how it's doing as it's progressing towards a goal, the 2 main takeaways that we know of (as of now) consists of Self-analyzing a goal's metric to see if it's improving, or by getting Explicit Feedback from a human to know HOW it's doing, personally self-analyzing metric principle is a principle i'm not that familiar of but i can already imagine how effective it can be especially when paired with a recurring CRON where on each wake-up, the agent is expected to: 

1. Call the metric tool(s)
2. Look at whether the number is improving or not
3. Decide what tasks to do next (or do nothing)

Aside the self-analyzing metric principle, Human feedback is still the higher-quality signal for overall Goal improvement, this takes us back to the PRELUDE framework (*PRE*ference *L*earning *U*ser *D*irect *E*dit), the idea of the agent receiving the user's Feedback and learns the added preferences/patterns to apply throughout the Completion of the Goal.

This is the reason why it's important to design goals in a way where it's easy to give feedbacks.

Combining both the methods requires a way to implement both the metrics for the agent to measure and drive itself with, alongside a way to get feedback from the user's, this is key to correct the agent's interpretation of success.



### Waking Up, and Knowing When to Stay Asleep

"When you give agents tasks, they run until it's completed, when you give them a goal, they need to work in the background"

Goal-oriented Agents are not always running as if it's a long-running consistent task that they're trying to achieve, they wake up at times to do some work, how do they wake up?

Some of the methods that we've seen are:
*  Heartbeats every x minutes
* Recurring cron
* One-off cron (reminder)
* Listening to event stream

One key insight here to take revolves around a problem that also arises when it comes to proactive agents, and it's the idea in how we shall construct the right heuristics for the agent to understand when NOT to disturb us, this plays a huge role when it comes to having a consistent and seamless UX.

"Heuristics" here is the tuning when it comes to pausing or ignoring these triggers.




### Memory: Making Feedback Stick

When executing a task-based agent (based off of the circumstance and the scenario) we could conclude that having a complicated memory system is fully unnecessary, it's a simple understanding of sequence: "user sends query/tasks -> agent executes task -> returns response" this is the backbone of the majority of the agents, adding complicated memories only for the sake of the systems "looking" complicated with diminishing returns in which an implementation of the right context engineering within a harness can achieve similar results without memory complexity, but now that we have a shifted achievement with these goal-oriented agents the situation is different, the focus when it comes to adding memory goes par-for-par with how it retains and uses relevant decisions from feedbacks across runs, constructing a poor memory system would alter the outcome you expect to achieve, damaging the purpose of an agent who's job is to reliably tailor the user's Feedback/Preference to achieve a dedicated goal.

## Conclusion

Our job as the controllers shifts from controlling the agent through a "Back and forth" Task specification, to applying Cybernetics.

The Agent becomes the ship that takes us to our goal, it follows an invisible line that leads to the big X on the map, steer left? the agent might take longer to achieve the goal, steer right? the agent might achieve the goal that wasn't an outcome you wanted, steer straight? solved by designing a goal that could easily receive Feedbacks amplifying the invisible line for it to be more visible, the exact trajectory needed to take us to where we want.


- **Cybernetics** comes from the Greek word _kybernētēs_ (_kubernan_), meaning **"steersman," "to steer,"** or **"to govern"**
