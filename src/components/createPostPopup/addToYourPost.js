import { Dots, Feeling, Photo } from '../../svg';

export default function AddToYourPost() {
  return (
    <div className="add_to_your_post">
      <div className="addto_text">Add to your post</div>
      <div className="post_header_right hover1">
        <Photo color="#45bd62" />
      </div>
      <div className="post_header_right hover1">
        <i className="tag_icon"></i>
      </div>
      <div className="post_header_right hover1">
        <Feeling color="#f7b928" />
      </div>
      <div className="post_header_right hover1">
        <i className="maps_icon"></i>
      </div>
      <div className="post_header_right hover1">
        <i className="microphone_icon"></i>
      </div>
      <div className="post_header_right hover1">
        <Dots color="#65676b" />
      </div>
    </div>
  );
}