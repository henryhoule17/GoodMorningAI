import {logo} from '../assets'

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
        <nav className="flex justify-between items-center w-full mb-10 pt-3">
            <img src={logo} alt="NewsPulse_logo" className="w-28 object-contain" />

            <button 
              type="button" 
              onClick={()=> window.open('https://github.com/henryhoule17/NewsPulse')} 
              className="black_btn"
            >
                GitHub
            </button>
        </nav>
        <h1 className="head_text">
          Updates on Any Topic Using <br className="max-md:hidden"/>
          <span className="orange_gradient">Generative AI</span>
        </h1>
        <h2 className="desc">
          NewsPulse is a web app that uses the power of LLMs to provide you periodic updates on any topic of your choosing.  
        </h2>
    </header>
  )
}

export default Hero
