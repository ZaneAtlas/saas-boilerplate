'use client'

import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import useUser from '@/app/hook/useUser'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useQueryClient } from '@tanstack/react-query'
import supabaseBrowser from '@/lib/supabase/browser'
import { usePathname, useRouter } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { protectedPaths } from '@/lib/constants'

export const Profile = () => {

  const { isFetching, data } = useUser()
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()

  if (isFetching) {
    return (
      <Skeleton className="h-12 w-12 rounded-full" />
    )
  }

  const handleLogout = async () => {
    const supabase = supabaseBrowser()
    queryClient.clear()
    await supabase.auth.signOut()
    router.refresh()
    if(protectedPaths.includes(pathname)) {
      router.replace("/auth/signin?next=" + pathname)
    }
  }

  const getInitials = (name: string) => {
    const nameParts = name.split(' ').filter(Boolean); // Split by spaces and remove empty strings
    if (nameParts.length === 0) return '';

    const initials = nameParts
      .map(part => part.charAt(0).toUpperCase()) // Take the first character and capitalize it
      .slice(0, 2) // Get only the first two initials
      .join('');

    return initials;
  };

  return (
    <div>
      {
        !data?.id ? (
          <Link href="/auth/signin">
            <Button variant="outline">Sign in</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={data.image_url} />
                <AvatarFallback>
                  {getInitials(data.display_name)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                  Profile
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <Button variant="destructive" className='w-full' onClick={handleLogout}>Log out</Button>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    </div>
  )
}
