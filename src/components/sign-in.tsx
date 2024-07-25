import { signIn } from "@/src/auth";
import { Button } from "./ui/button";
import { FaGithub } from "react-icons/fa";

export function SignIn() {
  return (
    <ul className="flex flex-col border-2 p-4 rounded-md gap-2 w-1/2 mt-8 max-h-[calc(100vh*3/5)] overflow-y-auto">
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <Button type="submit" className="flex truncate items-center gap-2">
          Signin with GitHub <FaGithub size={26} />
        </Button>
      </form>
    </ul>
  );
}
