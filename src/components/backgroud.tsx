const Background = ({ src, color }: { src?: string; color?: string }) => {
    return (
        <>
            {src && (
                //   <div
                //     style={{
                //       backgroundImage: `url(${src})`,
                //       height: '100vh',
                //       backgroundPosition: 'center',
                //       backgroundSize: 'contain',
                //       backgroundRepeat: 'no-repeat',
                //       width: '100vw',
                //       zIndex: -1,
                //       position: 'fixed',
                //       overflow: 'hidden',
                //       top: 0,
                //       left: 0,
                //     }}
                //   />
                <div className="bg-cover bg-center h-screen w-screen fixed top-0 left-0 z-[-1]" style={{ backgroundImage: `url(${src})` }}></div>
            )}
            {color && (
                // <div
                //     style={{
                //         backgroundColor: color,
                //         height: '100vh',
                //         width: '100vw',
                //         position: 'fixed',
                //         overflow: 'hidden',
                //         zIndex: -2,
                //         top: 0,
                //         left: 0,
                //     }}
                // />
                <div className="bg-cover bg-center h-screen w-screen fixed top-0 left-0 z-[-2]" style={{ backgroundColor: color }}></div>
            )}
        </>
    )
}

export default Background