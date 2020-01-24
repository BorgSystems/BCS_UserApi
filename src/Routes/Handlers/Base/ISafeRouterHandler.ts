import { Request, Response, NextFunction } from 'express';
import { ISafePredictableDelegate } from '../../RouterInterfaces';
import ApiContainer from '../../../Data/ApiContainer';

/**
 * Interface about checking of some router predictions
 */
export default interface ISafeRouterHandler {
    /**
     * Checking some predictions of http request
     * @param req = request of router
     * @param res = response of router
     * @param nextFunc = ?next middleware function
     */
    isSafe(apiContainer: ApiContainer, predictableDelegate: ISafePredictableDelegate): Promise<boolean>;
}