import Header from "../cores/components/header"
import Footer from "../cores/components/footer"

const AppContainer = ({children}) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default AppContainer;