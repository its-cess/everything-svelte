import { isBefore } from 'date-fns';

/**
 * This takes yyyy-mm-dd and returns m-d-yyyy
 *  @param {string} myDate
 *  @returns {string} m-d-yyy
 *
 * */

export const convertDate = (myDate: string): string => {
	// break apart the date:
	const [year, month, date] = splitDate(myDate);
	// return it in the correct format:
	//parseInt() turns the string into an number, which will remove any leading zeros, because numbers won't have leading zeros, but strings will
	return `${parseInt(month)}/${parseInt(date)}/${year}`;
};

/**
 * Determines whether a date is before today (meaning it's late!)
 * @param {string} myDate
 * @returns {boolean}
 */
export const isLate = (myDate: string): boolean => {
	const [year, month, date] = splitDate(myDate);
	const dueDate = new Date(parseInt(year), parseInt(month), parseInt(date));
	const today = new Date();
	return isBefore(dueDate, today);
};

/**
 * Takes a date yyyy-mm-dd and splits it into an array
 * @param {string} myDate
 * @returns {Array} [yyyy, mm, dd]
 */
export const splitDate = (myDate: string): Array<string> => {
	return myDate.split('-');
};
