import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      //required: true,
    },
    image: {
      type: String,
      default:
        'https://thenewstimesbd.com/wordpress/wp-content/uploads/2023/08/CUET-Main-Gate.jpg-1.jpg',
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;