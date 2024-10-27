import { User } from "@prisma/client";

import { ModeToggle } from "@/components/mode-toggle";
import { Wrapper } from "@/components/section-builders";
import { Badge } from "@/components/ui/badge";

export const Header = ({ user }: { user: User }) => {
    return (
        <header className="fixed flex h-20 w-full items-center border-b bg-background">
            <Wrapper className="flex w-full items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tighter">
                        TOUST
                    </h1>
                </div>
                <div className="flex items-center gap-x-2">
                    <Badge variant={"default"}>{user.plan}</Badge>
                    <ModeToggle />
                </div>
            </Wrapper>
        </header>
    );
};
