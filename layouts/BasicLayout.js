import FirebaseProvider from '../utils/firebase';

export default ({children, reviewChildren, view, open}) => {
  return (
    <FirebaseProvider>
      <div id="full-page" className="flex w-full h-full overflow-hidden bg-gray-200">
        <div className="flex w-full h-full p-4">
          <div className="flex flex-grow -mx-2">
            <div className={`flex ${open ? 'w-2/5' : 'w-full'} px-2`}>
              <div className="flex-grow bg-white border-2 border-black">
                { children }
                {/* <Component {...pageProps}/> */}
              </div>
            </div>
            { reviewChildren }
          </div>
        </div>        
      </div>
    </FirebaseProvider>
  )
}