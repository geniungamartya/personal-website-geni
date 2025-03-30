import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/playground")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ul className="space-y-8">
        <li className="flex flex-col">
          <h6 className="font-semibold px-2 py-3">Button</h6>
          <div>
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Solid
            </button>
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 focus:outline-none focus:border-blue-600 focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:text-blue-500 dark:focus:border-blue-600"
            >
              Outline
            </button>
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-blue-600 hover:bg-blue-100 hover:text-blue-800 focus:outline-none focus:bg-blue-100 focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:bg-blue-800/30 dark:hover:text-blue-400 dark:focus:bg-blue-800/30 dark:focus:text-blue-400"
            >
              Ghost
            </button>
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:hover:bg-blue-900 dark:focus:bg-blue-900"
            >
              Soft
            </button>
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              White
            </button>
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
            >
              Link
            </button>
          </div>
          <div>
            <div className="inline-flex rounded-lg shadow-sm">
              <button
                type="button"
                className="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                Years
              </button>
              <button
                type="button"
                className="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                Month
              </button>
              <button
                type="button"
                className="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                Date
              </button>
            </div>
          </div>
        </li>
        <li className="flex flex-col">
          <h6 className="font-semibold px-2 py-3">Card</h6>
          <div>
            <div className="border rounded-xl shadow-sm p-6 dark:bg-neutral-800 dark:border-neutral-700">
              <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div className="bg-gray-100 border-b rounded-t-xl pt-3 px-4 md:pt-4 md:px-5 dark:bg-neutral-800 dark:border-neutral-700">
                  <nav className="flex gap-x-2">
                    <a
                      className="-mb-px py-3 px-4 bg-white text-sm font-medium text-center border border-b-transparent text-gray-500 rounded-t-lg hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:z-10 dark:bg-neutral-900 dark:border-neutral-700 dark:border-b-gray-800 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
                      href="#"
                    >
                      Active
                    </a>

                    <a
                      className="-mb-px py-3 px-4 text-sm font-medium text-center border-b text-gray-500 rounded-t-lg hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:z-10 dark:border-neutral-700 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
                      href="#"
                    >
                      Link
                    </a>

                    <a
                      className="-mb-px py-3 px-4 text-sm font-medium text-center border-b text-gray-500 rounded-t-lg hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:z-10 dark:border-neutral-700 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
                      href="#"
                    >
                      Link
                    </a>
                  </nav>
                </div>
                <div className="p-4 text-center md:py-7 md:px-5">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    Card title
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-neutral-400">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a
                    className="mt-3 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    href="#"
                  >
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="flex flex-col">
          <h6 className="font-semibold px-2 py-3">Chat Bubble</h6>
          <div>
            <ul className="space-y-5">
              <li className="max-w-lg flex gap-x-2 sm:gap-x-4">
                <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                  <h2 className="font-medium text-gray-800 dark:text-white">
                    How can we help?
                  </h2>
                  <div className="space-y-1.5">
                    <p className="mb-1.5 text-sm text-gray-800 dark:text-white">
                      You can ask questions like:
                    </p>
                    <ul className="list-disc list-outside space-y-1.5 ps-3.5">
                      <li className="text-sm text-gray-800 dark:text-white">
                        What&aposs Preline UI?
                      </li>

                      <li className="text-sm text-gray-800 dark:text-white">
                        How many Starter Pages & Examples are there?
                      </li>

                      <li className="text-sm text-gray-800 dark:text-white">
                        Is there a PRO version?
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li className="max-w-lg ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                <div className="grow text-end space-y-3">
                  <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                    <p className="text-sm text-white">what&aposs preline ui?</p>
                  </div>
                </div>
              </li>

              <li className="max-w-lg flex gap-x-2 sm:gap-x-4">
                <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                  <p className="text-sm text-gray-800 dark:text-white">
                    Preline UI is an open-source set of prebuilt UI components
                    based on the utility-first Tailwind CSS framework.
                  </p>
                  <div className="space-y-1.5">
                    <p className="text-sm text-gray-800 dark:text-white">
                      Here&aposre some links to get started
                    </p>
                    <ul>
                      <li>
                        <a
                          className="text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500 dark:hover:text-blue-400"
                          href="../docs/index.html"
                        >
                          Installation Guide
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500 dark:hover:text-blue-400"
                          href="../docs/frameworks.html"
                        >
                          Framework Guides
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li className="flex flex-col">
          <h6 className="font-semibold px-2 py-3">Spinner</h6>
          <div>
            <div
              className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>

            <div
              className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>

            <div
              className="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </li>
        <li className="flex flex-col">
          <h6 className="font-semibold px-2 py-3">Accordion</h6>
          <div className="space-y-2">
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
          </div>
        </li>
        <li className="flex flex-col">
          <h6 className="font-semibold px-2 py-3">Text Input</h6>
          <div className="space-y-2">
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" placeholder="Email" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" className="grow" placeholder="Username" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input type="password" className="grow" value="password" />
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
}
