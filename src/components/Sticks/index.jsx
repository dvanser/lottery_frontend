import StickStyle from './SticksStyle.module.scss'
import sticks from '../../assets/sticks.png'

export const Sticks = () => {
    return (
        <div className={StickStyle['wrapper']}>
            <img src={sticks} alt='stick' className={'w-100 ' + StickStyle['stick']} />
        </div>
    )
}
