import { Link, useRouteLoaderData } from 'react-router-dom';
import { SwipeableButton } from 'react-swipeable-button';

const TaskDetail = () => {
  const dashData = useRouteLoaderData('dashboard');
  const handleComplete = () => {
    console.log('Workout completed! ');
    // Add an API call or other completion logic here.
  };

  const onSuccess = () => {
    console.log('Successfully Swiped!');
  };

  const onFailure = () => {
    console.log('Failed to Swipe!');
  };

  return (
    <div className="flex min-h-screen bg-[url(../public/e6776ace47454664d5f711b83a7b111fd132edde.jpg)] bg-cover bg-top dark:bg-gray-900">
      <div class=" inset-0 bg-black/50 flex flex-col items-center justify-between p-6 min-h-screen min-w-screen">
        {/* Top Section */}
        <div className="w-full max-w-sm flex items-start mt-4">
          <Link to="/dashboard">
            {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 cursor-pointer text-white dark:text-gray-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            }
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-4 items-left w-full max-w-sm text-left">
          <div className=" text-white text-sm dark:text-white bg-[#4263eb] size-fit px-2 py-1 rounded-sm ">
            WORKOUT
          </div>
          <div class="flex flex-col">
            <h1 className="text-3xl font-bold text-white dark:text-white">
              20 mins Running
            </h1>
            <div class="flex flex-row items-center">
              <img src="../public/image.png" class="w-[90px] ml-[-10px]"></img>
              <span className="text-white dark:text-white">
                200+ has done this challenge
              </span>
            </div>
          </div>
        </div>

        {/* Action card */}
        <section>
          <div class="flex gap-3">
            <div className="flex flex-col h-[100%] gap-8 justify-between w-[66%] p-4 mt-4 bg-gray-100 dark:bg-gray-800 rounded-2xl">
              <h2 className="text-gray-700 dark:text-gray-300 text-lg mb-4">
                Balance out
              </h2>
              <div className="flex justify-between items-center bg-white dark:bg-gray-700 p-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <span className="text-xs">🍔</span>
                  <span className="font-semibold text-gray-800 dark:text-white text-xs">
                    Fast food session
                  </span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">x1</span>
              </div>
            </div>
            <div className="w-[33%] p-4 mt-4 bg-gray-100 dark:bg-gray-800 rounded-2xl">
              <h2 className="text-gray-700 dark:text-gray-300 text-lg mb-10">
                Progress
              </h2>
              <div className="text-right rounded-lg ">
                <p>Finished</p>
                <p className="text-gray-600 dark:text-gray-400 text-2xl">1/2</p>
              </div>
            </div>
          </div>
          <div>
            <div className="w-full p-4 mt-3 bg-gray-100 dark:bg-gray-800 rounded-2xl ">
              <div className="flex flex-row gap-2 w-full">
                <span className="text-lg">💡</span>
                <h2 className="text-gray-700 dark:text-gray-300 text-lg mb-4">
                  What experts say:
                </h2>
              </div>
              <p>
                Research shows workout will improve body strength by 5%.
                Research shows workout will improve body strength by 5%.
              </p>
            </div>
          </div>
        </section>

        <div class="p-4">
          <SwipeableButton
            onSuccess={onSuccess}
            onFailure={onFailure}
            noAnimate={false} //default is false
            text="Swipe to complete"
            text_unlocked="You did it!"
            autoWidth={false}
            textColor="#ffffff"
            sliderColor="#09a777"
            sliderTextColor="#ffff" //default is #fff
            sliderIconColor="#fff" //default is #fff
            background_color="#594ffb" //default is #eee
            name="react-swipeable-button"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
