import {
  Avatar,
  Image,
  Link,
  Listbox,
  ListboxItem,
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from '@heroui/react';
import { useLogoutMutation, useMeQuery } from '../api/hooks';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  return (
    <NextNavbar classNames={{base: "border-b-2"}}>
      <NavbarBrand>
        <Image className="rounded-none" src="https://cdn.prod.website-files.com/6297d5d89ac9c5b4308579e1/6297d5d89ac9c550828579f0_Logo.svg" />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ProfileCircle />
        </NavbarItem>
      </NavbarContent>
    </NextNavbar>
  );
}

export function ProfileCircle() {
  const navigate = useNavigate()
  const { data, isFetching } = useMeQuery();
  const logout = useLogoutMutation()
  const items = [
    {
      key: 'email',
      label: <span className="font-bold">{data?.email}</span>,
    },
    {
      key: 'profile',
      label: 'Profile',
      onClick: async () => {
        alert("TODO: add profile page")
      }
    },
    {
      key: 'logout',
      label: 'Logout',
      onClick: async () => {
        await logout.mutateAsync()
        navigate("/login")
      }
    },
  ]

  return (
    <Skeleton isLoaded={!isFetching}>
      <Popover placement="top">
        <PopoverTrigger>
          <Avatar classNames={{base: "bg-primary/40", name: "font-bold"}} className="cursor-pointer" name={`${data?.firstName.charAt(0)}${data?.lastName.charAt(0)}`} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="w-full max-w-6xl rounded-small border-default-200 dark:border-default-100">
            <Listbox
              selectionMode="none"
              aria-label="Profile actions"
              items={items}
              onAction={(_key) =>{
                items.find(({ key }) => key === _key)?.onClick?.();
              }}
            >
              {(item) => (
                <ListboxItem
                  key={item.key}
                  className={item.key === 'logout' ? 'text-danger' : ''}
                  color={item.key === 'logout' ? 'danger' : 'default'}
                >
                  {item.label}
                </ListboxItem>
              )}
            </Listbox>
          </div>
        </PopoverContent>
      </Popover>
    </Skeleton>
  );
}
