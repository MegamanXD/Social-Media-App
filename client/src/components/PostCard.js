// 0.1. Declaring all dependency imports
import React from "react";
import { Grid, Button, Card, Icon, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom"; // ReactJS doesn't have href, so we use Link instead
import moment from "moment";

// 0.2. Declaring all file imports
  // None

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  // 1. Define how the component looks like
  return (
    <Card fluid>
      {/* 1.1. Post image at the top */}
      <Image src="https://images.newindianexpress.com/uploads/user/imagelibrary/2019/3/7/w900X450/Take_in_the_Scenery.jpg" />

      {/* 1.2. Main content of the post */}
      <Card.Content>
        {/* 1.2.1. Post Name is used as the Card Header */}
        <Card.Header>{username}</Card.Header>

        {/* 1.2.2. How old the post is */}
        <Card.Meta float="right" as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>

        {/* 1.2.3. Short description of the post */}
        <Card.Description>{body}</Card.Description>
      </Card.Content>

      {/* 1.3. Extra content: usually buttons */}
      <Card.Content extra>

        {/* Divide this section into 2 equal columns */}
        <Grid columns={2}>
          <Grid.Column>
            {/* 1.3.1. Like button */}
            <Button as="div" labelPosition="right">
              {/* The button */}
              <Button color="red">
                <Icon name="heart" />
                Likes
              </Button>

              {/* The count */}
              <Label as="a" basic color="red" pointing="left">
                {likeCount}
              </Label>
            </Button>
          </Grid.Column>

          <Grid.Column>
            {/* 1.3.1. Comment button */}
            <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
              {/* The button */}
              <Button color="blue">
                <Icon name="comments" />
                Comments
              </Button>

              {/* The count */}
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          </Grid.Column>

        </Grid>
      </Card.Content>
    </Card>
  );
}

// 2. Export the component for later use
export default PostCard;
