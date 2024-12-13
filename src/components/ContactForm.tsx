"use client";

import { useId, useState } from 'react'

import z from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FadeIn } from "./FadeIn";
import { Button } from './Button';
import { submitContactForm } from '@/server';
import { useRouter } from 'next/navigation';
import { ErrorNotification } from './ErrorNotification';

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  company: z.string(),
  phone: z.string(),
  message: z.string(),
  budget: z.union([
    z.literal('25'),
    z.literal('50'),
    z.literal('100'),
    z.literal('150'),
  ]),

})

type Schema = z.infer<typeof schema>


function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        name={props.name}
        {...props}
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={props.name}
        className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

function RadioInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  return (
    <label className="flex gap-x-3">
      <input
        type="radio"
        name={props.name}
        {...props}
        className="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-none checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-neutral-950">{label}</span>
    </label>
  )
}

export function ContactForm() {

  const router = useRouter()
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  async function onSubmit(values: Schema) {
    if(values) {
      setIsLoading(true)
      const response = await submitContactForm(values)
      setIsLoading(false)
      if(response.success) {
        router.push('/thank-you')
      } else {
        setIsError(true)
      }
    }
  }

  return (
    <FadeIn className="lg:order-last">
      {isError && <ErrorNotification />}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Work inquiries
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label="Name" autoComplete="name" {...form.register("name", {
            onChange: (e) => form.setValue("name", e.target.value),
            onBlur: (e) => form.setValue("name", e.target.value)
          })} />
          <TextInput
            label="Email"
            type="email"
            autoComplete="email"
            {...form.register("email", {
              onChange: (e) => form.setValue("email", e.target.value),
              onBlur: (e) => form.setValue("email", e.target.value)
            })}
          />
          <TextInput
            label="Company"
            autoComplete="organization"
            {...form.register("company", {
              onChange: (e) => form.setValue("company", e.target.value),
              onBlur: (e) => form.setValue("company", e.target.value)
            })}
          />
          <TextInput label="Phone" type="tel" autoComplete="tel" {...form.register("phone", {
            onChange: (e) => form.setValue("phone", e.target.value),
            onBlur: (e) => form.setValue("phone", e.target.value)
          })} />
          <TextInput label="Message" {...form.register("message", {
            onChange: (e) => form.setValue("message", e.target.value),
            onBlur: (e) => form.setValue("message", e.target.value)
          })} />
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">Budget</legend>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <RadioInput label="₹25K – ₹50K" value="25" {...form.register("budget", {
                  onChange: (e) => form.setValue("budget", e.target.value),
                  onBlur: (e) => form.setValue("budget", e.target.value)
                })} />
                <RadioInput label="₹50K – ₹100K" value="50" {...form.register("budget", {
                  onChange: (e) => form.setValue("budget", e.target.value),
                  onBlur: (e) => form.setValue("budget", e.target.value)
                })} />
                <RadioInput label="₹100K – ₹150K" value="100" {...form.register("budget", {
                  onChange: (e) => form.setValue("budget", e.target.value),
                  onBlur: (e) => form.setValue("budget", e.target.value)
                })} />
                <RadioInput label="More than ₹150K" value="150" {...form.register("budget", {
                  onChange: (e) => form.setValue("budget", e.target.value),
                  onBlur: (e) => form.setValue("budget", e.target.value)
                })} />
              </div>
            </fieldset>
          </div>
        </div>
        <Button type="submit" className="mt-10">
          {isLoading && 
            (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-circle mr-2 w-4 h-4 animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>)
          }
            Let’s work together
        </Button>
      </form>
    </FadeIn>
  )

}