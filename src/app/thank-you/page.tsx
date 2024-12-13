"use client";

import { Confetti } from "@/components/Confetti";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { useRedirectAfterSomeSeconds } from "@/hooks/useRedirectAfterSomeSeconds";

export default function ThankYouPage() {

  const { secondsRemaining } = useRedirectAfterSomeSeconds('/', 5);

  return (
    <Container className="flex min-h-screen items-center pt-24 sm:pt-32 lg:pt-40">
      <Confetti />
      <FadeIn className="flex max-w-xl flex-col items-center text-center">
        <p className="font-display text-4xl font-semibold text-neutral-950 sm:text-5xl">
          Thank you!
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-neutral-950">
          Your message has been sent.
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          You will get redirected automatically in {secondsRemaining}s.
        </p>
      </FadeIn>
    </Container>
  )
}