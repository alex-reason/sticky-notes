import './avatar.scss';

const Avatar = ({src, title='user'}) => {
  return (
    <div className='avatar'>
        <img src={src} alt='user avatar' title={title}/>
    </div>
  )
}

export default Avatar