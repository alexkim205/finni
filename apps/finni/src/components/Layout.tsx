import {Navbar} from "./Navbar";
import { PropsWithChildren } from 'react';

export function Layout({children}: PropsWithChildren) {
  return (
    <div className="min-h-screen w-full" id="main-container">
<Navbar />
      {children}
    </div>
  )
}
