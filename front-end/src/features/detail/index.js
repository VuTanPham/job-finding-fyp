import { Box, Container } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../../cores/context/auth";
import { getPostById } from "../../services/hiring-post.service";

const PostDetail = () => {

    const {id} = useParams();
    
    const {state: {token}} = useContext(authContext);
    const [post, setPost] = useState({});

    const getPost = useCallback(async () => {
        try {
            const response = await getPostById(id, token);
            if(response.status === 200) {
                setPost(response.data);
                console.log(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    }, [id, token])

    useEffect(() => {
        getPost();
    }, [getPost])

    return (
        <Container maxW="1100px">
            {id}
        </Container>
    )
}

export default PostDetail;