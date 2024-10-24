import { ImSpinner3 } from "react-icons/im";

export const LoadingSpinner = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <ImSpinner3 className="size-6 animate-spin" />;
        </div>
    );
};
