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
import { useMeQuery } from '../api/hooks';

export function Navbar() {
  return (
    <NextNavbar>
      <NavbarBrand>
        <Image src="https://cdn.prod.website-files.com/6297d5d89ac9c5b4308579e1/6297d5d89ac9c550828579f0_Logo.svg" />
        <p className="font-bold text-inherit">ACME</p>
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
  const { data, isFetching } = useMeQuery();

  return (
    <Skeleton isLoaded={!isFetching}>
      <Popover placement="top">
        <PopoverTrigger>
          <Avatar isDisabled name={`${data?.firstName} ${data?.lastName}`} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
            <Listbox
              aria-label="Profile actions"
              items={[
                {
                  key: 'profile',
                  label: 'Profile',
                },
                {
                  key: 'logout',
                  label: 'Logout',
                },
              ]}
              onAction={(key) => alert(key)}
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
