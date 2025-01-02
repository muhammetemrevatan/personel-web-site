export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1120] to-[#0B1120]">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-96 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#0F172A] rounded-lg overflow-hidden shadow-lg animate-pulse"
            >
              <div className="p-6">
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6 mb-6"></div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {[1, 2, 3].map((j) => (
                    <div
                      key={j}
                      className="h-6 bg-gray-700 rounded-full w-20"
                    ></div>
                  ))}
                </div>

                <div className="h-8 bg-gray-700 rounded w-32"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
