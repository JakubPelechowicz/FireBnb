<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateReservationRequest;
use App\Http\Requests\ListBnbRequest;
use App\Http\Requests\ListReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use App\Models\Bnb;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    private function isConflicting($start, $end, $bnb_id, $id = null)
    {
        $query = Reservation::query();
        $query->where(function ($q1) use ($start, $end) {
            $q1->where(function ($q2) use ($start, $end) {
                $q2->where('start_date', '>=', $start)
                    ->where('start_date', '<', $end);
            })->orWhere(function ($q2) use ($start, $end) {
                $q2->where('end_date', '>', $start)
                    ->where('end_date', '<=', $end);
            })->orWhere(function ($q2) use ($start, $end) {
                $q2->where('start_date', '<=', $start)
                    ->where('end_date', '>=', $end);
            });
        });
        if ($id != null)
            $query->where('id', '!=', $id);
        $query->where('bnb_id', '=', $bnb_id);
        $conflicts = $query->get();

        if ($conflicts->count() > 0)
            return true;
        else return false;
    }

    public function create(CreateReservationRequest $request)
    {
        if ($request->validated('start_date') > $request->validated('end_date'))
            return response()->json(['start_date is later than end_date'], 400);
        $bnb = Bnb::find($request->validated('bnb_id'));
        if ($bnb == null)
            return response()->json(['Bnb not found'], 404);
        if ($this->isConflicting($request->validated('start_date'), $request->validated('end_date'), $bnb->id))
            return response()->json(['Date is already reserved'], 400);
        $reservation = Reservation::create(['user_id' => auth()->user()->id] + $request->validated());
        return response()->json($reservation, 201);
    }

    public function update(UpdateReservationRequest $request)
    {
        if (($reservation = Reservation::find($request->validated('id'))) == null)
            return response()->json(['reservation not found'], 404);
        if ($reservation->user_id != auth()->user()->id)
            return response()->json(['Not authorized'], 403);
        if ($request->has('start_date'))
            $start = $request->validated('start_date');
        else $start = $reservation->start_date;
        if ($request->has('end_date'))
            $end = $request->validated('end_date');
        else $end = $reservation->end_date;
        if ($start > $end)
            return response()->json(['start_date is later than end_date'], 400);
        if ($this->isConflicting($start, $end, Bnb::find($reservation->bnb_id)->_id, $request->validated('id')))
            return response()->json(['Date is already reserved'], 400);
        $reservation->fill($request->validated());
        $reservation->save();
        return response()->json($reservation, 201);
    }

    public function index($id)
    {
        $reservation = Reservation::find($id);
        if ($reservation == null)
            return response()->json(['Not Found'], 404);
        return response()->json($reservation, 200);
    }

    public function list(ListReservationRequest $request)
    {
        $query = Reservation::query();
        $query->where('bnb_id', '=', $request->validated('bnb_id'));
        $query->where(function ($q) use ($request) {
            if ($request->has('start_date') && $request->has('end_date'))
                $q->where('end_date', '>=', $request->validated('start_date'))
                    ->where('start_date', '<=', $request->validated('end_date'));
            else if ($request->has('end_date'))
                $q->where('start_date', '<=', $request->validated('end_date'));
            else if ($request->has('start_date'))
                $q->where('start_date', '<=', $request->validated('end_date'));
        });
        $reservations = $query->get();
        return response()->json(['data' => [$reservations]], 200);
    }
    public function delete($id)
    {
        if(auth()->user()==null)
            return response()->json(['Not Authorized'],403);
        $reservation = Reservation::find($id);
        if($reservation->user_id!=auth()->user()->id)
            return response()->json(['Not Authorized'],403);
        if($reservation==null)
            return response()->json(['Not Found'],404);
        $reservation->delete();
        return response()->json($reservation,200);
    }
}
