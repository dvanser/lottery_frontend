import StickStyle from './SticksStyle.module.scss'
import sticks from '../../assets/sticks.png'

export const Sticks = () => {
    return (
        <div className={'text-center ' + StickStyle['wrapper']}>
            <img src={sticks} alt='stick' className={StickStyle['stick']} />
        </div>
    )
}
