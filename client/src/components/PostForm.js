import React from 'react';
import { Button, Form } from 'semantic-ui-react';

function PostForm() {


    function onSubmit() {
        console.log("Not yet implemented")
    }

    function onChange() {
        console.log("Not yet implemented")
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create a post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Hi World!"
                        name="body"
                        onChange={onChange}
                    />
                    <Button type="submit" color="blue">
                        Submit
          </Button>
                </Form.Field>
            </Form>
        </>
    );
}

export default PostForm;