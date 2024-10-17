import React from 'react';

export const useDetectColorTheme = () => {
    const [theme, setTheme] = React.useState('')
    React.useEffect(() => {
        if (window.matchMedia) {
          // Check if the dark-mode Media-Query matches
          if(window.matchMedia('(prefers-color-scheme: dark)').matches){
            // Dark
            console.log('dak')
            setTheme('dark')
          } else {
            // Light
            setTheme('light')
      
          }
        } else {
          setTheme('cant tell')
          // Default (when Media-Queries are not supported)
        }
       }, [])
       return {theme}
}