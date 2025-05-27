import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.gameRemote} className='w-full md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>We're not just another game store—we're your cheat code to epic loot, legendary wins, and sleepless nights fueled by endless adventures.</p>
          <p>From AAA titles to hidden indie gems, we've got the ultimate collection to power up your library. No side quests required—just grab, play, and conquer!</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>To bring gamers the best deals, instant access, and the thrill of unlocking new worlds—because waiting for a game to arrive in the mail is so last century.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-20'>

        {/* Quality Assurance Card - Neon Blue */}
        <div className='rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl'>
          <div className='bg-gradient-to-r from-blue-500 to-cyan-400 h-2'></div>
          <div className='p-8 border border-t-0 flex flex-col gap-5 h-full'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className='text-lg font-bold text-gray-800'>Quality Assurance</h3>
            </div>
            <p className='text-gray-600'>No RNG here—every game key is legit, verified, and ready to launch faster than your favorite speedrunner.</p>
            <div className='mt-auto pt-4'>
              <div className='w-12 h-1 bg-blue-400'></div>
            </div>
          </div>
        </div>

        {/* Convenience Card - Neon Green */}
        <div className='rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl'>
          <div className='bg-gradient-to-r from-green-400 to-emerald-500 h-2'></div>
          <div className='p-8 border border-t-0 flex flex-col gap-5 h-full'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-green-100 flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className='text-lg font-bold text-gray-800'>Convenience</h3>
            </div>
            <p className='text-gray-600'>Instant delivery means no more waiting around—your next adventure begins the moment you hit 'buy'.</p>
            <div className='mt-auto pt-4'>
              <div className='w-12 h-1 bg-green-400'></div>
            </div>
          </div>
        </div>

        {/* Customer Service Card - Neon Purple */}
        <div className='rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl'>
          <div className='bg-gradient-to-r from-purple-500 to-pink-500 h-2'></div>
          <div className='p-8 border border-t-0 flex flex-col gap-5 h-full'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className='text-lg font-bold text-gray-800'>Exceptional Support</h3>
            </div>
            <p className='text-gray-600'>Got questions? We've got answers—unless you're asking for cheat codes. Those, you'll have to find on your own.</p>
            <div className='mt-auto pt-4'>
              <div className='w-12 h-1 bg-purple-400'></div>
            </div>
          </div>
        </div>

      </div>

      <NewsLetterBox />

    </div>
  )
}

export default About
