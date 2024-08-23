function RestView() {
  return (
    <div className="mx-auto my-4 max-w-[700px] bg-background shadow-md">
      <div className="mb-4 flex h-12 flex-wrap items-center border bg-background py-2 ps-2">
        <select name="methods" id="1" className="border-r focus:outline-none">
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        <input
          type="text"
          placeholder="Your request"
          className="focus:shadow-outline h-full grow appearance-none rounded px-3 leading-tight text-gray-700 focus:outline-none"
        />
        <button
          type="button"
          className="linear h-full rounded-sm bg-accent px-3 text-accent-foreground transition delay-150 hover:bg-foreground hover:text-accent"
        >
          Send
        </button>
      </div>

      <div className="mb-4">
        <button type="button" className="mb-2 text-sm text-blue-500">
          Add Header
        </button>
        <div className="rounded-md border border-gray-300">
          <div className="flex p-2">
            <input
              type="text"
              placeholder="Header Key"
              className="flex-grow border-r border-gray-300 px-2 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Header Value"
              className="flex-grow px-2 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="textarea">
          Body:
          <textarea
            id="textarea"
            className="mt-1 w-full resize-y rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            rows={5}
            placeholder="Enter your JSON or text here..."
          />
        </label>
      </div>

      <div className="mt-6 border-t border-gray-300 pt-4">
        <h2 className="mb-2 text-lg font-medium text-gray-700">Response:</h2>
        <div className="mb-2">
          <span className="font-medium">Status:</span> <span>200 OK</span>
        </div>
        <div className="rounded-md border bg-secondary p-3">
          <pre className="whitespace-pre-wrap break-all">{'{\n  "key": "value"\n}'}</pre>
        </div>
      </div>
    </div>
  );
}

export default RestView;
