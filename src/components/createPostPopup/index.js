import { useRef, useState } from 'react';
import EmojiPickerAndBackground from './emojiPickerAndBackground';
import AddToYourPost from './addToYourPost';
import ImagePreview from './imagePreview';
import './style.css';
import useClickOutside from '../../helpers/clickOutside';
import { createPost } from '../../helpers/post';
import PulseLoader from 'react-spinners/PulseLoader';
import PostError from './postError';

export default function CreatePostPopup({ user, setCreatePostVisible }) {
  const [text, setText] = useState('');
  const [showPrev, setShowPrev] = useState(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const createPostPopup = useRef(null);

  useClickOutside(createPostPopup, () => {
    setCreatePostVisible(false);
  });

  const postSubmit = async () => {
    if (background) {
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.loginToken
      );

      setLoading(false);
      if (response === 'OK') {
        setBackground('');
        setText('');
        setCreatePostVisible(false);
      } else {
        setError(response);
      }
    }
  };

  return (
    <div className="blur">
      <div className="post_box" ref={createPostPopup}>
        {error && <PostError error={error} setError={setError} />}
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => {
              setCreatePostVisible(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img src={user?.picture} alt="" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="box_privacy">
              <img src="../../../icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>
        {!showPrev ? (
          <>
            <EmojiPickerAndBackground
              text={text}
              setText={setText}
              user={user}
              background={background}
              setBackground={setBackground}
            />
          </>
        ) : (
          <ImagePreview
            text={text}
            setText={setText}
            user={user}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button
          className="post_submit"
          onClick={() => {
            postSubmit();
          }}
          disabled={loading}
        >
          {loading ? <PulseLoader color="#fff" size={5} /> : 'Post'}
        </button>
      </div>
    </div>
  );
}
