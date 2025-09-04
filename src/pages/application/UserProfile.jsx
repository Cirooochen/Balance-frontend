const UserProfile = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full relative flex items-center justify-center p-4">
        <div className="absolute left-4 w-6 h-6 bg-black rounded"></div>
        <h1 className="text-lg font-semibold text-black">Profile</h1>
        <div className="absolute right-4 text-gray-500 text-sm">Logout</div>
      </div>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mt-2">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-[url(../public/profilepicture.png)] bg-center bg-cover"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-black rounded-full"></div>
        </div>
        <p className="mt-2 font-semibold text-gray-800">Rick</p>
        <p className="text-sm text-gray-500">rick.sanches@gmail.com</p>
      </div>

      {/* Balance Journey */}
      <div className="mt-16 w-full px-6">
        <h2 className="text-lg font-semibold text-center text-black">
          My balance journey
        </h2>
        <p className="text-center text-sm text-gray-500 mt-1">
          18 Aug – 24 Aug 2025
        </p>
        <div className="mt-6 relative flex flex-col items-center">
          <div className="bg-[url(../public/db22e50472f2979714b92c490ed1bcc90144f9ae.png)] min-h-[40vh] max-w-[80%] bg-cover bg-center text-white rounded-2xl p-6 shadow-md flex flex-col items-center">
            <h3 className="text-5xl font-bold">6</h3>
            <p className="mt-1 text-sm">Balance moves</p>

            {/* Tags */}
            <div className="flex gap-2 mt-3">
              <span className="px-3 py-1 text-xs rounded-full bg-white/20">
                Nutrition
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-white/20">
                Workout
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-white/20">
                Hydration
              </span>
            </div>

            {/* Efforts */}
            <p className="mt-6 text-sm">Need more efforts</p>
            <div className="flex justify-between w-full text-xs mt-2">
              <span>42% Balance moves</span>
              <span>58% Imbalances</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-1 mt-1">
              <div
                className="bg-white h-1 rounded-full"
                style={{ width: '42%' }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="carousel carousel-center bg-white rounded-box max-w-md space-x-4 p-4">
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
            className="rounded-box"
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
