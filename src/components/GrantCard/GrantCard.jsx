import * as grantsAPI from '../../utilities/grants-api';
import './GrantCard.css'
import { SavedIcon, SaveIcon } from '../SaveIcons/SaveIcons';

export default function GrantsCards({ user, grant, grantsCopy, setGrantsCopy, grants, setGrants }) {
    async function saveGrant(grantId, userId) {
        let grant = await grantsAPI.saveGrant({ grantId, userId });
        console.log(grant);
        const userSet = new Set(...[grant.users]);
        grant.isSaved = userSet.has(user._id);
        const grantIndexCopy = grantsCopy.findIndex((elem) => elem._id === grant._id);
        const grantIndex = grants.findIndex((elem) => elem._id === grant._id);
        setGrantsCopy([...grantsCopy.slice(0, grantIndexCopy), grant, ...grantsCopy.slice(grantIndexCopy + 1)]);
        setGrants([...grants.slice(0, grantIndex), grant, ...grants.slice(grantIndex + 1)]);
    }

    function handleClick(evt) {
        saveGrant(evt.target.id, user._id);
    }

    function formatDate(date) {
        const newDate = new Date(date);
        const options = {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }
        return newDate.toLocaleDateString('en-US', options);
    }

    return (
        <article className="items-center bg-white rounded-lg border-1 border-neutral-300  mb-8 last:mb-0 md:flex-row hover:bg-gray-100">
            <section className='flex flex-row justify-between text-white bg-primary-500 rounded-t-md px-4 py-2'>
                <p>CFDA #: {grant.CFDANumbers}</p>
                <p>{formatDate(grant.CloseDate)}</p>
            </section>
            <div className="justify-between p-4 bg-shade-0 rounded-b-md leading-normal">
                <section className='flex items-center justify-between'>
                    <h5 className="text-2xl font-semibold tracking-tight text-gray-900">{grant.OpportunityTitle}</h5>
                    <div className='cursor-pointer' onClick={handleClick} id={grant._id}>
                        {grant.isSaved ? <SavedIcon /> : <SaveIcon />}
                    </div>
                </section>
                <h4 className="mb-2 text-base tracking-tight text-gray-900">{grant.AgencyName}</h4>
                <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900">Description</h5>
                <p id="grant-desc">{grant.Description}</p>
                <a href='/selectedgrant'>Read More</a>
            </div>
        </article>
    )
}