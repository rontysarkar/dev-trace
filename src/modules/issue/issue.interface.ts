export interface IIssue {
    title:string,
    description:string,
    type : 'feature_request' | 'bug' ,
    status : 'open' | 'in_progress' | 'resolved',
}


export type RReporter = {
    id:number,
    name:string,
    role:string;
}

export type RIssue = {
    id:number,
    title:string,
    description:string,
    type : 'feature_request' | 'bug' ,
    status : 'open' | 'in_progress' | 'resolved',
    reporter:RReporter,
    created_at :string,
    updated_at:string,
}

export type UpdateIssue = Partial<Omit<IIssue,'reporter_id' | 'status'>>

export type QueryParams = {
    sort?:'newest' | 'oldest',
    type?: 'bug' | 'feature_request',
    status?: 'open' | 'in_progress' | 'resolved',
}

