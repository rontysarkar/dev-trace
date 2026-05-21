export interface IIssue {
    title:string,
    description:string,
    type : 'feature_request' | 'bug' ,
    status : 'open' | 'in_progress' | 'resolved',
    reporter_id : number
}