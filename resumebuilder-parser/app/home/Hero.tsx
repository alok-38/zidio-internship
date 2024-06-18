import Link from "next/link";
import { FlexboxSpacer } from "../components/FlexboxSpacer";
import { AutoTypingResume } from "./AutoTypingResume";

export const Hero = () => {
  return (
    <section className="lg:flex lg:h-[825px] lg:justify-center">
      <FlexboxSpacer maxWidth={75} minWidth={0} className="hidden lg:block" />
      <div className="mx-auto max-w-xl pt-8 text-center lg:mx-0 lg:grow lg:pt-32 lg:text-left leading-10">
        <h1 className="text-[#8910F1] pb-2 text-4xl font-bold lg:text-5xl leading-10">
          Create a professional
          <br />
          resume easily
        </h1>
        <p className="mb-10 text-lg lg:mt-5 lg:text-xl italic">
          With this powerful resume builder
        </p>
        <Link href="/resume-import">
      <div className="text-center bg-[#8910F1] text-white p-4 w-96 rounded-md inline-block transform transition-transform duration-300 cursor-pointer hover:bg-[#a752f2]">
        Create Resume
      </div>
    </Link>
        <p className="mt-10 ml-2 text-sm text-gray-600">No sign up required</p>
        <p className="mt-3 text-sm text-gray-600 lg:mt-36">
          Already have a resume? Test its ATS readability with the{" "}
          <Link href="/resume-parser" className="underline underline-offset-2">
            resume parser
          </Link>
        </p>
      </div>
      <FlexboxSpacer maxWidth={100} minWidth={50} className="hidden lg:block" />{" "}
      <div className="mt-6 flex justify-center lg:mt-4 lg:block lg:grow">
        <AutoTypingResume />
      </div>
    </section>
  );
};
