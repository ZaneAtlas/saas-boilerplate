"use client";
import React, { Suspense } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
    IconArrowRight,
    IconBrandGithubFilled,
    IconBrandGoogleFilled,
    IconKey,
} from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import supabaseBrowser from "@/lib/supabase/browser";
import { useSearchParams } from "next/navigation";

interface AuthFormProps {

    type: "signin" | "signup";

}

function Form(props: AuthFormProps) {

    const params = useSearchParams()
    const next = params.get("next") || "/dashboard"

    const handleLogin = (provider: "google" | "github") => {

        const supabase = supabaseBrowser()
        supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: location.origin + '/auth/callback?next=' + next
            }
        })

    }
    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-zinc-50 dark:bg-zinc-900 drop-shadow-lg">

            <div className="flex w-full">
                <IconKey />
                <h2 className="font-bold ml-5 text-xl">
                    Next.js + Supabase
                </h2>
            </div>

            <form className="mt-8">
                {
                    props.type == 'signin' ? ''
                        :
                        <>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" placeholder="Username" type="text" />
                            </LabelInputContainer>
                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                                <LabelInputContainer>
                                    <Label htmlFor="firstname">First name</Label>
                                    <Input id="firstname" placeholder="First name" type="text" />
                                </LabelInputContainer>
                                <LabelInputContainer>
                                    <Label htmlFor="lastname">Last name</Label>
                                    <Input id="lastname" placeholder="Last name" type="text" />
                                </LabelInputContainer>
                            </div>
                        </>
                }

                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="Email" type="email" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="••••••••" type="password" />
                </LabelInputContainer>

                <Button
                    className="flex w-full relative group/btn hover:duration-500 text-zinc-100"
                    type="submit"
                >
                    {props.type == 'signin' ? "Sign In" : "Sign up"} <IconArrowRight className="ml-4" />
                    <BottomGradient />
                </Button>

                <div className="flex items-center">
                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                    <div><p>or</p></div>
                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                </div>

                <div className="w-full flex justify-center items-center mb-8 text-zinc-500 text-sm">
                    <p>{props.type == 'signin' ? "Sign In" : "Sign up"} with</p>
                </div>

                <div className={props.type == "signin" ? "flex flex-col space-y-4" : "flex items-center space-x-4"}>
                    <button
                        className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        onClick={() => handleLogin("github")}
                    >
                        <IconBrandGithubFilled className="h-6 w-6 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                            GitHub
                        </span>
                        <BottomGradient />
                    </button>

                    <button
                        className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        onClick={() => handleLogin("google")}
                    >
                        <IconBrandGoogleFilled className="h-6 w-6 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                            Google
                        </span>
                        <BottomGradient />
                    </button>
                </div>
                <div className="flex justify-center items-center mt-5 text-xs">
                    {
                        props.type == "signin" ?
                            <>
                                <h6 className="text-zinc-400">Don&apos;t have an account?</h6>
                                <Link href="/auth/signup"><p className="ml-2 text-sm hover:cursor-pointer relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:rounded-full after:bg-zinc=950 after:dark:bg-zinc-100 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">Register</p></Link>
                            </>
                            :
                            <>
                                <h6 className="text-zinc-400">Already have an account?</h6>
                                <Link href="/auth/signin"><p className="ml-2 text-sm hover:cursor-pointer relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:rounded-full after:bg-zinc=950 after:dark:bg-zinc-100 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">Login</p></Link>
                            </>
                    }
                </div>
            </form>
        </div>
    )
}

export function AuthForm(props: AuthFormProps) {

    return (
        <Suspense>
            <Form type={props.type} />
        </Suspense>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
