import HeroImg from "@/assets/images/Me.png";
import UniLogo from "@/assets/images/uni.jpg"; // you can replace with your university logo or any relevant image

export default function About() {
  return (
    <>
      <section id="about" className="py-16 md:py-32 text-white bg-[#04081A]">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl text-white">
            Learner, Developer, Problem Solver
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="relative mb-6 sm:mb-0">
              <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl p-px from-zinc-300 to-transparent">
                <img
                  src={HeroImg}
                  className="rounded-[15px] shadow block"
                  alt="portfolio illustration"
                  width={1207}
                  height={929}
                />
              </div>
            </div>

            <div className="relative space-y-4">
              <p className="text-white">
                Hello! I'm{" "}
                <span className="font-bold text-white">Khush Sonani</span>, a
                Computer Science undergraduate at Nirma University. I have a
                strong foundation in{" "}
                <span className="font-bold">
                  Data Structures, Algorithms, and Object-Oriented Programming
                </span>
                . I enjoy solving problems and building projects to strengthen
                my learning.
              </p>

              <p className="text-white">
                Currently, I’m exploring{" "}
                <span className="font-bold">Web Development</span> and{" "}
                <span className="font-bold">Machine Learning</span>, while
                improving my skills in core CS subjects like Operating Systems,
                DBMS, and DSA. I believe in learning by doing and constantly
                working on projects to grow as a developer.
              </p>

              <div className="pt-6">
                <blockquote className="border-l-4 border-gray-300 pl-4">
                  <p className="text-white">
                    I'm in my learning phase, passionate about improving every
                    day through coding, collaboration, and real-world projects.
                    My goal is to become a skilled software developer who can
                    contribute to impactful and scalable solutions.
                  </p>

                  <div className="mt-6 space-y-3">
                    <cite className="block font-medium text-white">
                      Khush Sonani, Computer Science Undergraduate
                    </cite>
                    <div className="flex items-center gap-2">
                      <img
                        className="h-5 w-fit"
                        src={UniLogo}
                        alt="University Logo"
                        height="20"
                        width="auto"
                      />
                      <span className="text-white">Nirma University</span>
                    </div>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
